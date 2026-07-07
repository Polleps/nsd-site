import { Card } from '../../lib/Card';
import { Icon, ValidIcon } from '../../lib/Icon';
import styles from './SocialLink.module.css';

interface SocialLinkProps {
  icon: ValidIcon;
  link: string;
  name: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  icon,
  link,
  name,
}) => (
  <a href={link}>
    <Card className={styles.card}>
      <Icon icon={icon} className={styles.icon} />
      <span className={styles.title}>{name}</span>
    </Card>
  </a>
);
