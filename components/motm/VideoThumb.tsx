import { getYTThumbnailUrl } from '../../helpers/youtube';
import type { MotM } from '../../types/CMS';
import styles from './VideoThumb.module.css';

export interface VideoThumbProps {
  match: MotM;
}

const formatter = Intl.DateTimeFormat('nl-NL', {
  month: 'long',
});

export const VideoThumb: React.FC<VideoThumbProps> = ({ match }) => {
  const date = formatter.format(new Date(match.date));

  return (
    <li>
      <a className={styles.link} href={match.videoUrl} rel="noreferrer nofollow noopener" target="_blank">
        <h3 className={styles.heading}>{date}</h3>
        <p>{match.videoTitle}</p>
        <img className={styles.thumb} src={getYTThumbnailUrl(match.videoUrl)} alt="" />
      </a>
    </li>
  );
};
