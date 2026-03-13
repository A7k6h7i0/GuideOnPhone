export interface IReview {
  bookingId: string;
  userId: string;
  agentId: string;
  rating: number;
  comment?: string;
}
