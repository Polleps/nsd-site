import React from 'react';
import { Tournament } from '../../types/Tournament';
import { styled, theme } from '../../stitches.config';
import { TournamentCard } from './TournamentCard';

export interface TournamentListProps {
  tournaments: Tournament[];
}

const StyledAnchor = styled('a', {
  '&:hover': {
    textDecoration: 'underline',
  },
  color: theme.colors.link,
  textAlign: 'end',
  marginTop: theme.sizes.md,
  display: 'block',
  fontSize: theme.fontSizes.large,
});

const List = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.sizes.md,
});

export const TournamentList: React.FC<TournamentListProps> = ({ tournaments }) => {

  return (
    <>
      <List>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            <TournamentCard tournament={tournament} />
          </li>
        ))}
      </List>
      <StyledAnchor
        href="https://pgksmash.nl/agenda"
        target="_blank"
        rel="noopener noreferrer"
      >
        Meer toernooien
      </StyledAnchor>
    </>
  );
};
