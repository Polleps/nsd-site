import { Tournament } from '../../types/Tournament';
import { Card } from '../lib/Card';
import Image from 'next/image';
import { styled, theme } from '../../stitches.config';

export interface TournamentCardProps {
  tournament: Tournament;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
};

const DateWrapper = styled('time', {
  // textAlign: 'end',
  fontWeight: theme.fontWeights.medium,
  color: 'rgba(255 255 255 / 57%)',
  fontSize: '2.4rem',
  '@smDown': {
    fontSize: '1.5rem',
  },
});

const CardContent = styled('div', {
  display: 'grid',
  gap: theme.sizes.md,
  gridTemplateColumns: '5rem auto',
  gridTemplateRows: '2rem 2rem',
  gridTemplateAreas: '"img title" "img location"',
});

const ImageWrapper = styled('div', {
  gridArea: 'img',
  '& .tournament-card-image': {
    borderRadius: theme.radii.main,
  },
});

const TitleWrapper = styled('span', {
  gridArea: 'title',
  fontSize: '1.15rem',
  fontWeight: theme.fontWeights.medium,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

const LocationWrapper = styled('address', {
  gridArea: 'location',
  fontStyle: 'normal',
});

const Link = styled('a', {
  display: 'block',
  transition: 'box-shadow 10    0ms ease-in-out',
  borderRadius: theme.radii.main,
  '&:hover, &:focus': {
    outline: 'none',
    boxShadow: `0px 0px 0px 2px ${theme.colors.secondary}`,
  },
});

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => (
  <div>
    <DateWrapper dateTime={new Date(tournament.startDate).toISOString()}>
      {new Date(tournament.startDate).toLocaleDateString('nl-NL', dateOptions)}
    </DateWrapper>
    <Link href={`https://www.start.gg/tournament/${tournament.url}`} target="_blank" rel="noreferrer">
      <Card>
        <CardContent>
          <ImageWrapper>
            <Image
              className="tournament-card-image"
              height={100}
              width={100}
              src={tournament.image ?? ''}
              alt={`Logo of ${tournament.title}`}
            />
          </ImageWrapper>
          <TitleWrapper>
            {tournament.title}
          </TitleWrapper>
          <LocationWrapper>
            {tournament.city}
          </LocationWrapper>
        </CardContent>
      </Card>
    </Link>
  </div>
);
