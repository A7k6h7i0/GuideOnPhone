export const sendOtp = async (phone: string): Promise<void> => {
  void phone;
};

export const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
  void phone;
  return otp === "123456";
};
