import type { Tournament, TournamentPage } from '../../types/Tournament';

/** Origin of the Discord bot's web API. Override with TOURNAMENT_API_BASE_URL (e.g. for local testing). */
const API_BASE_URL = process.env.TOURNAMENT_API_BASE_URL || 'https://pgksmash.nl';

const fetchTournamentPage = async (params: Record<string, string>): Promise<TournamentPage> => {
  const url = `${API_BASE_URL}/api/tournaments?${new URLSearchParams(params)}`;
  const res = await fetch(url);

  if (!res.ok) {
    // Throwing keeps the last good ISR page instead of caching an empty one.
    throw new Error(`GET ${url} failed with ${res.status}`);
  }

  return res.json() as Promise<TournamentPage>;
};

/**
 * The next 2 upcoming or ongoing offline tournaments, soonest first.
 * No `from`: the server defaults to now, which keeps the URL constant for Next's fetch cache.
 */
export const fetchTournaments = async (): Promise<Tournament[]> => {
  const page = await fetchTournamentPage({ online: 'false', limit: '2' });

  return page.items;
};

/** The newest edition of the tournament with this start.gg slug, past or upcoming. */
export const fetchTournamentByUrl = async (slug: string): Promise<Tournament | undefined> => {
  const page = await fetchTournamentPage({ url: slug, limit: '1' });

  return page.items[ 0 ];
};
