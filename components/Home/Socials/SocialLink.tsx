import { css, styled, theme } from '../../../stitches.config';
import { Card } from '../../lib/Card';
import { Icon, ValidIcon } from '../../lib/Icon';

interface SoscialLinkProps {
  icon: ValidIcon;
  link: string;
  name: string;
}

const StyledCard = styled(Card, {
  '&:hover': {
    boxShadow: theme.shadows.pressed,
    transform: 'scale(0.98)',
    filter: 'brightness(1.3)',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: `${theme.sizes.lg} !important`,
  transition: 'box-shadow 100ms ease-in-out, transform 100ms ease-in-out',
});

const iconClass = css({
  width: '5rem',
})();

const Title = styled('span', {
  flex: 1,
  textAlign: 'center',
  fontSize: theme.fontSizes.large,
  color: theme.colors.link,
  fontWeight: theme.fontWeights.bold,
});

export const SocialLink: React.FC<SoscialLinkProps> = ({
  icon,
  link,
  name,
}) => (
  <a href={link}>
  <StyledCard>
    <Icon icon={icon} className={iconClass.toString()} />
      <Title>{name}</Title>
  </StyledCard>
  </a>
);
