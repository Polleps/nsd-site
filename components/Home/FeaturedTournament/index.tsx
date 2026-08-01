import Image from 'next/image';
import type { Tournament } from '../../../types/Tournament';
import { Card } from '../../lib/Card';
import { Container } from '../../lib/Container';
import styles from './FeaturedTournament.module.css';

export interface FeaturedTournamentProps {
  tournament: Tournament;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const FeaturedTournament: React.FC<FeaturedTournamentProps> = ({
  tournament,
}) => (
  <div className={styles.wrapper}>
    <Container size='large'>
      <a
        className={styles.link}
        href={`https://www.start.gg/tournament/${tournament.url}`}
        target='_blank'
        rel='noreferrer'
      >
        <Card type='custom' interaction className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={tournament.image ?? ''}
              alt={`Logo of ${tournament.title}`}
              fill
            />
          </div>
          <div className={styles.content}>
            <span className={styles.eyebrow}>Uitgelicht toernooi</span>
            <h2 className={styles.title}>{tournament.title}</h2>
            <div className={styles.meta}>
              <time dateTime={new Date(tournament.startDate).toISOString()}>
                {new Date(tournament.startDate).toLocaleDateString(
                  'nl-NL',
                  dateOptions,
                )}
              </time>
              -<address className={styles.location}>{tournament.city}</address>
            </div>
            {tournament.description && (
              <p className={styles.description}>{tournament.description}</p>
            )}
          </div>
        </Card>
      </a>
    </Container>
  </div>
);
