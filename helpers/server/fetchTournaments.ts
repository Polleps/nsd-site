import { Tournament } from '../../types/Tournament';

const TOURNAMENT_ROUTE = 'https://pgksmash.nl/tournaments';

export const fetchTournaments = async (): Promise<Tournament[]> => {
  const tournaments = await fetch(TOURNAMENT_ROUTE).then((res) => res.json()) as Tournament[];

  return tournaments?.filter(
    (tournament) =>
      tournament
      && !tournament.isOnline
      && tournament.startDate
      && (tournament.startDate ?? 0) > Date.now()
  )
    .sort((a, b) => a.startDate - b.startDate)
    .slice(0, 2) ?? [];
};
