import {
  faDiscord,
  faInstagram,
  faTiktok,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

const icons = {
  twitter: faTwitter,
  discord: faDiscord,
  youtube: faYoutube,
  tiktok: faTiktok,
  instagram: faInstagram,
};

export type ValidIcon = keyof typeof icons;
export interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  icon: ValidIcon;
}

export const Icon: React.FC<IconProps> = props => {
  const { icon, ...rest } = props;

  return <FontAwesomeIcon {...rest} icon={icons[icon]} />;
};
