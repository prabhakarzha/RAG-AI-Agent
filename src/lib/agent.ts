// src/lib/agent.ts
export function getOrCreateAgentId() {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem("agentId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("agentId", id);
  }
  return id;
}

// src/lib/agent.ts
export function resetAgentId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("agentId");
}
