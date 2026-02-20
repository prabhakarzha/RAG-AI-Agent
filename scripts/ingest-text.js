// scripts/ingest-text.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL); // debug
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const text = `
Prabhakar's brother name is prabhat. both are software engineers. her bhabhi name is ashima jha. she is also working in pnb housing. prabhakar's father name is manoj kumar jha. he is a child specialist doctor. prabhakar lives in hyderbad . his brother living in noida . prabhakar working in capgemini .prabhakar's bhabhi name is Ashima jha.
`;

async function run() {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: text,
  });

  const { error } = await supabase.from("documents").insert({
    content: text,
    embedding,
  });

  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("✅ Text stored in vector DB");
  }
}

run();
