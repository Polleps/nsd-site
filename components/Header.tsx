import React from 'react';
import { Tournament } from '../types/Tournament';
import { styled, theme } from '../stitches.config';
import { DiscordInvite } from './DiscordInvite';
import { Container } from './lib/Container';
import { NavBar } from './NavBar';
import { TournamentList } from './tournamentlist/TournamentList';
import type { HeaderData } from '../helpers/server/cms';

export interface HeaderProps {
  tournaments: Tournament[];
  cmsData: HeaderData;
}

const StyledHeader = styled('header', {
  backgroundImage: `${theme.colors.backgroundTransparent}, ${theme.colors.backgroundTransparent}, url(/banner_cr.webp)`,
  backgroundBlendMode: 'normal, color',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: '100%',
  color: theme.colors.text,
  display: 'grid',
  gridTemplateAreas: '"content" "nav"',
  gridTemplateRows: '1fr 4rem',
  gridTemplateColumns: '1fr',
  paddingTop: theme.sizes.xl,
  gap: theme.sizes.xl,

  '@smDown': {
    backgroundSize: 'unset',
    gridTemplateAreas: '"nav" "content"',
    gridTemplateRows: '4rem 1fr',
    paddingTop: 0,
  },
});

const HeaderContainer = styled(Container, {
  gridArea: 'content',
});

const HeaderContent = styled('div', {
  display: 'grid',
  gridTemplateAreas: '"text" "tournaments" "discord"',
  '@md': {
    gridTemplateAreas: '"text . tournaments" "discord . tournaments"',
  },
  gap: theme.sizes.xl,
});

const TextWrapper = styled('div', {
  gridArea: 'text',
  maxWidth: '70ch',
  '& h1': {
    fontSize: '2.3rem',
    fontWeight: theme.fontWeights.medium,
    '@xsDown': {
      fontSize: '2rem',
    },
  },
  '& p': {
    fontSize: '1.15rem',
    marginTop: theme.sizes.md,
  },
});

const DiscordInviteWrapper = styled('div', {
  gridArea: 'discord',
  alignSelf: 'end',
});

const TournamentsWrapper = styled('div', {
  gridArea: 'tournaments',
});

const NavWrapper = styled('div', {
  gridArea: 'nav',
});

export const Header: React.FC<HeaderProps> = ({ tournaments, cmsData }) => (
  <StyledHeader>
    <HeaderContainer size="large">
      <HeaderContent>
        <TextWrapper>
          <h1>{cmsData.header.pageTitle}</h1>
          <p>{cmsData.header.headerParagraph}</p>
        </TextWrapper>
        <DiscordInviteWrapper>
          <DiscordInvite />
        </DiscordInviteWrapper>
        <TournamentsWrapper>
          <TournamentList tournaments={tournaments}/>
        </TournamentsWrapper>
      </HeaderContent>
    </HeaderContainer>
    <NavWrapper>
      <NavBar />
    </NavWrapper>
  </StyledHeader>
);
