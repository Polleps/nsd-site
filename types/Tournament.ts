export interface Tournament {
  url: string;
  title: string;
  image?: string;
  description?: string;
  location: string;
  city: string;
  locationID: string;
  startDate: number;
  endDate: number;
  type: 'smashgg' | 'other';
  smashggID?: string;
  id?: string;
  pr?: boolean;
  lng?: number;
  lat?: number;
  participants?: number;
  registrationClosesAt?: number;
  isOnline: boolean;
  messageID?: string;
}