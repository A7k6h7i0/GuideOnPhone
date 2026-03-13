export const generateItinerary = (places: string[]): string[] => {
  return [...places].sort((a, b) => a.localeCompare(b));
};
