'use client';

import clsx from 'clsx';
import Image from 'next/image';
import useSWR from 'swr';
import { Button } from './Button';
import { Card } from './lib/Card';
import { DISCORD_INVITE } from './lib/constants';
import styles from './DiscordInvite.module.css';

const fetcher = (id: string) => fetch(`https://discord.com/api/guilds/${id}/widget.json`)
  .then((res) => res.json())
  .then((data) => data.presence_count);

const memberCountFetcher = (url: string) => fetch(url)
  .then((res) => res.json())
  .then((data) => data.count);

export const DiscordInvite: React.FC = () => {
  const { data: onlineData } = useSWR<number>('153286266878689280', fetcher);
  const { data: memberData } = useSWR<number>('/api/membercount', memberCountFetcher);

  return (
    <Card className={styles.inviteCard}>
      <div className={styles.icon}>
        <Image
          className={styles.logo}
          src="/nsd_logo.webp"
          width={120}
          height={120}
          alt="NSD Logo"
        />
      </div>
      <span className={styles.title}>Nederlandse Smash Discord</span>
      <span className={clsx(styles.count, styles.online)}>{onlineData ?? '-'} Online</span>
      <span className={clsx(styles.count, styles.members)}>{memberData ?? '-'} Members</span>
      <Button className={styles.button} href={DISCORD_INVITE}>
        <span>
          Join
        </span>
      </Button>
    </Card>
  );
};
