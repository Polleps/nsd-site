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
      <h3>{date}</h3>
      <MockThumb />
    </li>
  );
};

const MockThumb = styled('div', {
  backgroundColor: '#fff',
  aspectRatio: '16/9',
  borderRadius: theme.radii.main,
});
