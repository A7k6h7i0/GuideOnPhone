import type { Agent } from "@/types/models";

export const GuideProfileHeader = ({ agent }: { agent: Agent }) => (
  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
    <h1 className="font-display text-3xl font-semibold">{agent.userId.name}</h1>
    <p className="mt-1 text-slate-600">{agent.city}, {agent.state} | Languages: {agent.languages.join(", ")}</p>
    <p className="mt-3 text-sm">INR {agent.guideFee} per trip | Rating {agent.avgRating.toFixed(1)}</p>
    <p className="mt-2 text-sm text-slate-700">Call: {agent.userId.phone}</p>
    <p className="text-sm text-slate-700">Email: {agent.userId.email}</p>
  </div>
);
