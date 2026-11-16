import Image from 'next/image';
import type { Tournament } from '../../types/Tournament';
import { Card } from '../lib/Card';
import { LiveStreamLink } from './LiveStreamLink';
import styles from './TournamentCard.module.css';

export interface TournamentCardProps {
  tournament: Tournament;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
};

/**
 * The whole card links to start.gg through the title link, whose ::after covers the card.
 * That keeps the live stream link a real, separate link inside the card (links can't nest).
 */
export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const location = (
    <address className={styles.locationWrapper}>
      {tournament.city}
    </address>
  );

  return (
    <div>
      <time className={styles.dateWrapper} dateTime={new Date(tournament.startDate).toISOString()}>
        {new Date(tournament.startDate).toLocaleDateString('nl-NL', dateOptions)}
      </time>
      <Card className={styles.card}>
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
          <a
            className={styles.titleWrapper}
            href={`https://www.start.gg/tournament/${tournament.url}`}
            target="_blank"
            rel="noreferrer"
          >
            {tournament.title}
          </a>
          <div className={styles.locationRow}>
            {tournament.streamURL ? (
              <LiveStreamLink
                startDate={tournament.startDate}
                endDate={tournament.endDate}
                streamURL={tournament.streamURL}
              >
                {location}
              </LiveStreamLink>
            ) : location}
          </div>
        </div>
      </Card>
    </div>
  );
};
