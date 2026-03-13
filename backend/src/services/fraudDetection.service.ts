export const fraudDetectionService = {
  async scoreBooking(input: { userId: string; amount: number; city: string }) {
    const risk = input.amount > 100000 ? 0.8 : 0.2;
    return { riskScore: risk, needsManualReview: risk > 0.7 };
  }
};
