import { styled } from '@stitches/react';
import Link from 'next/link';
import { theme } from '../stitches.config';

const StyledNav = styled('nav', {
  '& > ul': {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
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

export const NavBar = () => (
  <StyledNav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Lorem</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Toernooien</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Nieuws</a>
        </Link>
      </li>
    </ul>
  </StyledNav>
);
