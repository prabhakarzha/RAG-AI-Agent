"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getOrCreateAgentId, resetAgentId } from "@/lib/agent";
export default function RAGPage() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  const askQuestion = async () => {
    const agentId = getOrCreateAgentId();
    console.log("agentId from frontend:", agentId);
    console.log("question from frontend:", question);

    if (!question.trim()) return;

    setIsLoading(true);
    setError("");
    setAnswer("");

    try {
      const payload = { question, agentId };
      console.log("Sending payload:", payload);

      const res = await fetch("/api/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("Raw API response:", text);

      if (!res.ok) throw new Error(text);

      const data = JSON.parse(text);
      setAnswer(data.answer || "No answer returned.");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-3 sm:p-4">
      {" "}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-100">
        {" "}
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 p-5 sm:p-8 text-white">
          {" "}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
              <svg
                className="w-9 h-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2"
                />
              </svg>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Personal AI Agent
              </h1>

              <button
                onClick={() => router.push("/")}
                className="self-start sm:self-auto px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                ← Back to Chat
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
          {" "}
          {/* Input Area */}
          <div className="space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="w-full min-h-[100px] border rounded-xl p-3 sm:p-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />

            <button
              onClick={askQuestion}
              disabled={!question || isLoading}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold ..."
            >
              {isLoading ? "Thinking..." : "Ask"}
            </button>
            <button
              onClick={resetAgentId}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Reset my agent
            </button>
            {/* ✅ Inline alert (new) */}
            {resetMsg && (
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 animate-fadeIn">
                ⚠️ {resetMsg}
              </div>
            )}
            <button
              onClick={() => router.push("/admin/ingest")}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-purple-300 bg-white text-purple-700 font-semibold ..."
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Upload your private knowledge
            </button>
          </div>
          {/* Answer */}
          {answer && (
            <div className="animate-fadeIn">
              <h3 className="font-semibold text-gray-700 mb-2">Answer</h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 text-gray-800 whitespace-pre-wrap">
                {answer}
              </div>
            </div>
          )}
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4">
            {" "}
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-900 text-sm">
                Vector Search
              </h4>
              <p className="text-xs text-purple-700">
                Answers come from your own data
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 text-sm">
                RAG Pipeline
              </h4>
              <p className="text-xs text-blue-700">
                Retrieval + Generation combined
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl p-4 border border-pink-200">
              <h4 className="font-semibold text-pink-900 text-sm">
                Private Data
              </h4>
              <p className="text-xs text-pink-700">Your docs stay in your DB</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
