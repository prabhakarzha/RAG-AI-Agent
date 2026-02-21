import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-3 sm:p-6">
      {" "}
      <main className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 p-5 sm:p-10 text-white">
          {" "}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
              <Image
                src="/next.svg"
                alt="Logo"
                width={32}
                height={32}
                className="invert"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                AI Assistant Hub
              </h1>{" "}
              <p className="text-purple-100 text-xs sm:text-sm mt-1">
                {" "}
                Chat with AI or ask questions from your own Private knowledge.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
          {" "}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900">
              What would you like to do?
            </h2>
            <p className="text-gray-600 mt-2">
              Choose between a general AI chat or a Personal RAG-based AI Agent
            </p>
          </div>
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {" "}
            {/* Chat Card */}
            <Link
              href="/chat"
              className="group block rounded-2xl border border-gray-200 p-5 sm:p-8 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  💬
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {" "}
                  AI Chat
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Talk to a general-purpose AI assistant. Ask anything and get
                instant responses.
              </p>
              <div className="mt-4 text-sm font-medium text-purple-600 group-hover:underline">
                Go to Chat →
              </div>
            </Link>
            {/* RAG Card */}
            <Link
              href="/rag"
              className="group block rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  📄
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Personal RAG-based AI Agent{" "}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Query your private knowledge base using vector search and RAG.
              </p>
              <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                Go to RAG →
              </div>
            </Link>
          </div>
          {/* Footer Info */}
          <div className="pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
            {" "}
            Designed and developed by Prabhakar
          </div>
        </div>
      </main>
    </div>
  );
}
