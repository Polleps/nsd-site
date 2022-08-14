import { styled } from '../stitches.config';
import { Header } from './Header';

const StyledFooter = styled('footer', {
  minHeight: '4rem',
});

export const Layout: React.FC = ({ children }) => (
  <>
    {children}
  </>
);
