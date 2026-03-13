import type { Agent } from "@/types/models";

export const rankAgents = (agents: Agent[]): Agent[] => {
  return [...agents].sort((a, b) => {
    const aScore = a.avgRating * 3 + a.totalCustomersServed;
    const bScore = b.avgRating * 3 + b.totalCustomersServed;
    return bScore - aScore;
  });
};
