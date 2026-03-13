import Link from "next/link";
import type { Agent } from "@/types/models";

export const GuideCard = ({ agent }: { agent: Agent }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-lg font-semibold">{agent.userId.name}</p>
    <p className="text-sm text-slate-600">{agent.city}, {agent.state}</p>
    <p className="mt-2 text-sm">Rating: {agent.avgRating.toFixed(1)} | INR {agent.guideFee}/trip</p>
    <Link href={`/guides/${agent._id}`} className="mt-4 inline-block rounded-xl bg-ink px-3 py-2 text-sm font-semibold text-white">View Profile</Link>
  </div>
);
