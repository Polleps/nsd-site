import type { HomePageData } from '../../../helpers/server/cms';
import { Container } from '../../lib/Container';
import { SocialLink } from './SocialLink';
import styles from './Socials.module.css';

export interface SocialsProps {
  cmsData: HomePageData;
}

export const Socials: React.FC<SocialsProps> = ({ cmsData }) => (
  <div className={styles.wrapper}>
    <Container className={styles.container} size="large">
      <h2 className={styles.heading}>
        {cmsData.homepage.linksHeading}
      </h2>
      <ul className={styles.list}>
        {cmsData.homepage.links?.map((link) => (
          <li key={link.url}>
            <SocialLink
              icon={link.icon}
              link={link.url}
              name={link.display}
            />
          </li>
        ))}
      </ul>
    </Container>
  </div>
);
