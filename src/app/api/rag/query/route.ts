import { supabase } from "@/lib/supabase";
import { openai } from "@ai-sdk/openai";
import { embed, generateText } from "ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { question, agentId } = await req.json();

    if (!question || !agentId) {
      return Response.json(
        { error: "Missing question or agentId" },
        { status: 400 },
      );
    }

    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: question,
    });

    // 🔎 Vector search scoped to agentId
    const { data, error } = await supabase.rpc("match_documents_by_agent", {
      query_embedding: embedding,
      match_count: 5,
      agent_id_param: agentId,
    });

    if (error) {
      console.error("Vector search error:", error);
      return Response.json({ error: "Search failed" }, { status: 500 });
    }

    const context =
      data && data.length > 0
        ? data.map((d: { content: string }) => d.content).join("\n\n")
        : "";

    // 🛑 If nothing relevant found, don't let the LLM hallucinate
    if (!context || context.trim().length < 10) {
      return Response.json({
        answer: "I don't have this information in your knowledge base yet.",
      });
    }

    // 🤖 Strict RAG prompt
    const { text } = await generateText({
      model: openai("gpt-4.1-mini"),
      prompt: `
You are a strict RAG assistant.

Answer ONLY using the context below.
If the answer is not present in the context, reply:
"I don't have this information in your knowledge base."

Context:
${context}

Question:
${question}
`,
    });

    return Response.json({ answer: text });
  } catch (err) {
    console.error("RAG query error:", err);
    return Response.json({ error: "Query failed" }, { status: 500 });
  }
}
