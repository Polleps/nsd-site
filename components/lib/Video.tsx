import { styled, theme } from '../../stitches.config';

export interface VideoProps {
  ytSrc: string;
  title: string;
}

const StyledIframe = styled('iframe', {
  // backgroundColor: 'white',
  borderRadius: theme.radii.main,
  aspectRatio: '16 / 12',
  maxWidth: '100%',
});

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
  <StyledIframe
    src={buildYtEmbedUrl(ytSrc)}
    title={title}
    {...{}/* @ts-ignore */}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen={true}
  />
);
