export interface IAgent {
  agentId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  languages: string[];
  availableHours: string;
  guideFee: number;
  feePerTrip: number;
  cabBooking: boolean;
  canBookCab: boolean;
  hotelBooking: boolean;
  canBookHotel: boolean;
  aadhaarMasked?: string;
  aadhaarEncrypted?: string;
  aadhaarOtpHash?: string;
  aadhaarOtpExpiresAt?: Date;
  aadhaarOtpSessionId?: string;
  aadhaarPhotoPath?: string;
  aadhaarVerified: boolean;
  selfieImage?: string;
  faceVerified: boolean;
  faceSimilarityScore?: number;
  gstReferences: string[];
  gstVerified: boolean;
  status: "PENDING_VERIFICATION" | "APPROVED" | "REJECTED";
  rejectionReason?: string;

  // Legacy compatibility fields.
  bio?: string;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  isActive: boolean;
  totalCustomersServed: number;
  avgRating: number;
}
