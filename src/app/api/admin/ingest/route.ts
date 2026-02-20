export const runtime = "nodejs";

import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { supabase } from "@/lib/supabase";

function chunkText(text: string, size = 800) {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

export async function POST(req: Request) {
  try {
    const { text, agentId } = await req.json();

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Invalid text" }, { status: 400 });
    }
    if (!agentId) {
      return Response.json({ error: "Missing agentId" }, { status: 400 });
    }

    const chunks = chunkText(text, 800);
    let stored = 0;

    for (const chunk of chunks) {
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: chunk,
      });

      const { error } = await supabase.from("documents").insert({
        content: chunk,
        embedding,
        agent_id: agentId,
      });

      if (error) throw error;
      stored++;
    }

    return Response.json({ success: true, chunks: stored });
  } catch (err: unknown) {
    console.error("Admin ingest error:", err);
    return Response.json({ error: "Ingestion failed" }, { status: 500 });
  }
}
