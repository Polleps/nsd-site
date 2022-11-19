import { styled } from '@stitches/react';
import Link from 'next/link';
import { theme } from '../stitches.config';

const StyledNav = styled('nav', {
  'a:hover': {
    textDecoration: 'underline',
  },
  alignItems: 'center',
  backgroundColor: theme.colors.backgroundDarkTransparantPlain,
  borderBottom: '2px solid $secondary',
  color: '$text',
  display: 'flex',
  fontSize: '$large',
  fontWeight: '$medium',
  height: '100%',
  '@supports (backdrop-filter: blur(10px))': {
    backgroundColor: theme.colors.backgroundDarkTransparantBlur,
    backdropFilter: 'blur(20px)',
  },
});

const List = styled('ul', {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: '1rem',
  width: '100%',
  padding: theme.sizes.md,

  '@media (max-width: 599px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const NavBar = () => (
  <StyledNav>
    <List>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/mvdm">
          Match van de maand
        </Link>
      </li>
      <li>
        <a href="https://pgksmash.nl/agenda" target="_blank" rel="noreferrer">
          Toernooien
        </a>
      </li>
      <li>
        <Link href="/articles">
          Tips & Tricks
        </Link>
      </li>
    </List>
  </StyledNav>
);
