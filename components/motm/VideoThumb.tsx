import { getYTThumbnailUrl } from '../../helpers/youtube';
import { styled, theme } from '../../stitches.config';
import { MotM } from '../../types/CMS';

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
      <Link href={match.videoUrl} rel="noreferrer nofollow noopener" target="_blank">
        <Heading>{date}</Heading>
        <p>{match.videoTitle}</p>
        <Thumb src={getYTThumbnailUrl(match.videoUrl)} />
      </Link>
    </li>
  );
};


const Thumb = styled('img', {
  // aspectRatio: '16/9',
  width: '100%',
  borderRadius: theme.radii.main,
  transition: 'filter 0.1s ease-in-out',
});

const Heading = styled('h3', {
  textTransform: 'capitalize',
  transition: 'color 0.1s ease-in-out',
  flex: 1,
});

const Link = styled('a', {
  cursor: 'pointer',
  [ `&:hover ${Heading}, &focus ${Heading}` ]: {
    color: theme.colors.secondary,
  },
  [ `&:hover ${Thumb}, &focus ${Thumb}` ]: {
    filter: 'brightness(0.8)',
  },

  display: 'flex',
  flexDirection: 'column',
  gap: theme.sizes.sm,
  height: '100%',
});
