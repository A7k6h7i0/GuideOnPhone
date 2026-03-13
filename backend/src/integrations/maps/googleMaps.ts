export const buildGoogleMapsLink = (lat: number, lng: number): string =>
  `https://maps.google.com/?q=${lat},${lng}`;
