import React from 'react';
import { styled, theme } from '../../stitches.config';
import { MotM } from '../../types/CMS';
import { Container } from '../lib/Container';
import { VideoThumb } from './VideoThumb';

export interface ArchiveListProps {
  matches: MotM[];
}

interface YearLabelProps {
  year: number;
}

const Wrapper = styled('div', {
  backgroundColor: theme.colors.backgroundLight,
  marginTop: theme.sizes.xl,
  paddingTop: theme.sizes.xl,
  paddingBottom: `calc(${theme.sizes.xl} * 2)`,
});

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
  const devidedMatches = React.useMemo(() => devideIntoYears(matches.slice(1)), [matches]);

  return (
    <Wrapper>
      <Container size="large">
        <ol>
          {Array.from(devidedMatches.entries()).map(([ year, matches ]) => (
            <li key={year}>
              <YearLabel year={year} />
              <ThumbGrid>
                {Array.from(matches).map((match) => (
                  <VideoThumb key={match.videoUrl} match={match} />
                ))}
              </ThumbGrid>
            </li>
          ))}
        </ol>
      </Container>
    </Wrapper>
  );
};

const YearLabel: React.FC<YearLabelProps> = ({ year }) => (
  <YearLabelWrapper>
    <Line />
    <h2>{year}</h2>
    <Line />
  </YearLabelWrapper>
);

const YearLabelWrapper = styled('div', {
  display: 'flex',
  gap: theme.sizes.xl,
  alignItems: 'center',
});

const Line = styled('div', {
  borderBottom: `2px solid ${theme.colors.text}`,
  flex: 1,
});

const ThumbGrid = styled('ol', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.sizes.lg,
  paddingBlock: theme.sizes.lg,
});
