import styles from './Video.module.css';

export interface VideoProps {
  ytSrc: string;
  title: string;
}

const buildYtEmbedUrl = (ytUrl: string) => {
  const [ id ] = Array.from(ytUrl.matchAll(/\w{11}/g));
  const url = new URL(ytUrl);
  const time = url.searchParams.get('t');

  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${id}`);

  if (time) {
    embedUrl.searchParams.set('start', time);
  }

  return embedUrl.toString();
};

export const Video: React.FC<VideoProps> = ({ ytSrc, title }) => (
  <iframe
    className={styles.iframe}
    src={buildYtEmbedUrl(ytSrc)}
    title={title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);
