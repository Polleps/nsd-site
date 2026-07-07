import type { Tournament } from '../../types/Tournament';
import { TournamentCard } from './TournamentCard';
import styles from './TournamentList.module.css';

export interface TournamentListProps {
  tournaments: Tournament[];
}

export const TournamentList: React.FC<TournamentListProps> = ({ tournaments }) => {
  return (
    <>
      <ol className={styles.list}>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            <TournamentCard tournament={tournament} />
          </li>
        ))}
      </ol>
      <a className={styles.anchor} href="https://pgksmash.nl/agenda" target="_blank" rel="noopener noreferrer">
        Meer toernooien
      </a>
    </>
  );
};
