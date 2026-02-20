import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // useChat() latest SDK sends `input` when sending a message
    const userInput =
      body.input ||
      body.messages?.[body.messages.length - 1]?.content ||
      body.messages?.[body.messages.length - 1]?.parts?.[0]?.text ||
      "";

    if (!userInput) {
      return new Response("No input provided", { status: 400 });
    }

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      prompt: userInput,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Chat failed", { status: 500 });
  }
}
