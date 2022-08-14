import { styled, theme } from '../../stitches.config';

export interface VideoProps {
  ytSrc: string;
  title: string;
}

const StyledIframe = styled('iframe', {
  height: '30rem',
  // backgroundColor: 'white',
  borderRadius: theme.radii.main,
  aspectRatio: '16 / 9',
  maxWidth: '100%',
});

const buildYtEmbedUrl = (ytUrl: string) => {
  const [ id ] = Array.from(ytUrl.matchAll(/\w{11}/g));

  return `https://www.youtube-nocookie.com/embed/${id}`;
};


export const Video: React.FC<VideoProps> = ({ ytSrc, title }) => (
  <StyledIframe
    src={buildYtEmbedUrl(ytSrc)}
    title={title}
    {...{}/* @ts-ignore */}
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen={true}
  />
);
