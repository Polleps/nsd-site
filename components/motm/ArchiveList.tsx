import React from 'react';
import type { MotM } from '../../types/CMS';
import { Container } from '../lib/Container';
import { VideoThumb } from './VideoThumb';
import styles from './ArchiveList.module.css';

export interface ArchiveListProps {
  matches: MotM[];
}

interface YearLabelProps {
  year: number;
}

const getYear = (date: string) => new Date(date).getFullYear();

const devideIntoYears = (matches: MotM[]) => {
  const yearMap = new Map<number, Set<MotM>>();

  for (const match of matches) {
    const year = getYear(match.date);

    if (!yearMap.has(year)) {
      yearMap.set(year, new Set([ match ]));
    }

    yearMap.get(year)!.add(match);
  }

  return yearMap;
};

export const ArchiveList: React.FC<ArchiveListProps> = ({ matches }) => {
  const devidedMatches = React.useMemo(() => devideIntoYears(matches.slice(1)), [ matches ]);

  if (matches.length === 1) {
    return <div className={styles.wrapper}>
      <Container size="large">
        Er is nog niks om terug te kijken.
      </Container>
    </div>;
  }

  return (
    <div className={styles.wrapper}>
      <Container size="large">
        <ol>
          {Array.from(devidedMatches.entries()).map(([ year, matches ]) => (
            <li key={year}>
              <YearLabel year={year} />
              <ol className={styles.thumbGrid}>
                {Array.from(matches).map((match) => (
                  <VideoThumb key={match.videoUrl} match={match} />
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
};

const YearLabel: React.FC<YearLabelProps> = ({ year }) => (
  <div className={styles.yearLabelWrapper}>
    <div className={styles.line} />
    <h2>{year}</h2>
    <div className={styles.line} />
  </div>
);
