import Image from 'next/image';
import useSWR from 'swr';
import { styled, theme } from '../stitches.config';

import { Card } from './lib/Card';
import { DISCORD_INVITE } from './lib/constants';

const fetcher = (id: string) => fetch(`https://discord.com/api/guilds/${id}/widget.json`)
  .then((res) => res.json())
  .then((data) => data.presence_count);

const memberCountFetcher = (url: string) => fetch(url)
  .then((res) => res.json())
  .then((data) => data.count);


const InviteCard = styled(Card, {
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: '7rem 1fr 1fr 1fr',
  gridTemplateAreas: '"icon title title button" "icon online members button"',
  gap: theme.sizes.md,
  maxWidth: '50rem',
  '@xsDown': {
    gridTemplateColumns: '5rem 1fr 1fr 1fr',
    gridTemplateAreas: '"icon title title title" "online online members members" "button button button button"',
  },
});

const Icon = styled('div', {
  gridArea: 'icon',
});

const Title = styled('span', {
  gridArea: 'title',
  fontSize: theme.fontSizes.large,
  fontWeight: theme.fontWeights.bold,
});

const Count = styled('span', {
  '&::before': {
    content: '" "',
    display: 'inline-block',
    width: '1rem',
    height: '1rem',
    backgroundColor: theme.colors.primary,
    borderRadius: '50%',
  },
  display: 'flex',
  alignItems: 'center',
  gap: theme.sizes.sm,

  variants: {
    color: {
      online: {
        '&::before': {
          backgroundColor: '#45C170',
        },
      },
      members: {
        '&::before': {
          backgroundColor: '#6C6C6C',
        },
      },
    },
  },
});

const Online = styled(Count, {
  gridArea: 'online',
});

const Members = styled(Count, {
  gridArea: 'members',
});

const Button = styled('a', {
  'span': {
    backgroundImage: theme.colors.gradientMain,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.sizes.md} calc(${theme.sizes.xl} * 1.5)`,
    borderRadius: theme.radii.main,
    fontSize: theme.fontSizes.large,
    fontWeight: theme.fontWeights.medium,
  },
  '&::before': {
    backgroundImage: theme.colors.gradientMain,
    content: '""',
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: theme.radii.main,
    zIndex: -1,
    transitionShort: [ 'filter' ],
    opacity: 0.8,
  },
  '&:hover, &:focus': {
    '&::before': {
      filter: 'blur(10px)',
    },
    filter: 'brightness(1.3)',
  },
  gridArea: 'button',
  position: 'relative',
  transitionShort: ['filter'],
});


export const DiscordInvite: React.FC = () => {
  const { data: onlineData, error: onlineError } = useSWR<number>('153286266878689280', fetcher);
  const { data: memberData, error: memberError } = useSWR<number>('/api/membercount', memberCountFetcher);
  console.log(memberError);

  return (
    <InviteCard>
      <Icon>
        <Image
          src="/nsd_logo.webp"
          width={120}
          height={120}
          alt="NSD Logo"
        />
      </Icon>
      <Title>Nederlandse Smash Discord</Title>
      <Online color="online">{onlineData ?? '-'} Online</Online>
      <Members color="members">{memberData ?? '-'} Members</Members>
      <Button href={DISCORD_INVITE}>
        <span>
          Join
        </span>
      </Button>
    </InviteCard>
  );
};
