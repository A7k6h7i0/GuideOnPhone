import { AgentModel } from "../models/Agent.model.js";

export const rankingService = {
  async topAgentsByCity(city: string) {
    return AgentModel.find({ city, isActive: true, status: "APPROVED" }).sort({ avgRating: -1, totalCustomersServed: -1, guideFee: 1 }).limit(20);
  }
};
