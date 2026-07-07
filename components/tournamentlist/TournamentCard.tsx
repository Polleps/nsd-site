import Image from 'next/image';
import type { Tournament } from '../../types/Tournament';
import { Card } from '../lib/Card';
import styles from './TournamentCard.module.css';

export interface TournamentCardProps {
  tournament: Tournament;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
};

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => (
  <div>
    <time className={styles.dateWrapper} dateTime={new Date(tournament.startDate).toISOString()}>
      {new Date(tournament.startDate).toLocaleDateString('nl-NL', dateOptions)}
    </time>
    <a
      className={styles.link}
      href={`https://www.start.gg/tournament/${tournament.url}`}
      target="_blank"
      rel="noreferrer"
    >
      <Card>
        <div className={styles.cardContent}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.tournamentCardImage}
              height={100}
              width={100}
              src={tournament.image ?? ''}
              alt={`Logo of ${tournament.title}`}
            />
          </div>
          <span className={styles.titleWrapper}>
            {tournament.title}
          </span>
          <address className={styles.locationWrapper}>
            {tournament.city}
          </address>
        </div>
      </Card>
    </a>
  </div>
);
