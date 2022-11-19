import { HomePageData } from '../../../helpers/server/cms';
import { styled, theme } from '../../../stitches.config';
import { Container } from '../../lib/Container';
import { SocialLink } from './SocialLink';

export interface SocialsProps {
  cmsData: HomePageData;
}

const Wrapper = styled('div', {
  backgroundColor: theme.colors.backgroundLight,
  marginTop: theme.sizes.xl,
  paddingTop: theme.sizes.xl,
  paddingBottom: `calc(${theme.sizes.xl} * 2)`,
});

const StyledContainer = styled(Container, {
  display: 'flex',
  gap: theme.sizes.xl,
  alignItems: 'center',
  flexDirection: 'column',
});

const Heading = styled('h2', {
  textAlign: 'center',
  fontSize: theme.fontSizes.colorHeadings,
  backgroundImage: theme.colors.gradientMain,
  backgroundClip: 'text',
  color: 'transparent',
  width: 'fit-content',
  margin: '0 auto',
  filter: 'brightness(1.5)',
  textShadow: theme.shadows.main,
  '&h2': {
    margin: '0',
  },
});

const SocialList = styled('ul', {
  width: 'min(100%, 50rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.sizes.lg,
});

export const Socials: React.FC<SocialsProps> = ({ cmsData }) => (
  <Wrapper>
    <StyledContainer size="large">
      <Heading>
        {cmsData.homepage.linksHeading}
      </Heading>
      <SocialList>
        {cmsData.homepage.links?.map((link) => (
          <li key={link.url}>
            <SocialLink
              icon={link.icon}
              link={link.url}
              name={link.display}
            />
          </li>
        ))}
      </SocialList>
    </StyledContainer>
  </Wrapper>
);
