export interface TournamentEvent {
  name: string;
  /** Entrant cap as typed in the bot's form; '' when there is none. */
  cap: string;
}

export interface TournamentPrice {
  name: string;
  amount: number;
}

/**
 * A tournament as returned by the bot's `GET /api/tournaments`.
 * Dates are epoch ms; fields the bot has no value for are left out.
 */
export interface Tournament {
  /** start.gg tournament id. */
  id: string;
  /** start.gg slug; reused across editions of a tournament. */
  url: string;
  title: string;
  image: string;
  description: string;
  location: string;
  city: string;
  locationID: string;
  startDate: number;
  endDate: number;
  type: 'smashgg' | 'other';
  isOnline: boolean;
  nocap: boolean;
  pr: boolean;
  events: TournamentEvent[];
  prices: TournamentPrice[];
  /** Present only when the tournament has a stream (always together with streamStartDate). */
  streamURL?: string;
  streamStartDate?: number;
  participants?: number;
  registrationClosesAt?: number;
}

export interface TournamentPage {
  items: Tournament[];
  nextCursor: string | null;
}
