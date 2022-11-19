import React from 'react';
import { styled, theme } from '../../stitches.config';
import { Button } from '../Button';

export interface ErrorProps {
  code: number;
  title: string;
}

export const Error: React.FC<React.PropsWithChildren<ErrorProps>> = ({ code, title, children }) => {
  return (
    <Wrapper>
      <Card>
        <Heading><ErrCode>{code}</ErrCode> {title}</Heading>
        {children}
        <StyledButton href="/">
          <span>
            Naar Homepagina
          </span>
        </StyledButton>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled('main', {
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
  padding: '1rem',
});

const Card = styled('div', {
  width: 'min(100%, 90ch)',
  padding: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: theme.colors.backgroundLight,
  display: 'grid',
  placeItems: 'center',
  alignContent: 'center',
  minHeight: 'min(100%, 20rem)',
});

const Heading = styled('h1', {
  marginBlockEnd: '1rem',
});

const ErrCode = styled('span', {
  color: '#ff3f3f',
  // fontSize: '4rem',
});

const StyledButton = styled(Button, {
  marginTop: '2rem',
  display: 'inline-block',
  '& span': {
    fontSize: '1rem',
  },
});
