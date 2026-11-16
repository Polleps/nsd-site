'use client';

import { useSyncExternalStore } from 'react';
import styles from './LiveStreamLink.module.css';

export interface LiveStreamLinkProps {
  startDate: number;
  endDate: number;
  streamURL: string;
}

const CHECK_INTERVAL_MS = 60_000;

const subscribeToClock = (onChange: () => void) => {
  const handle = setInterval(onChange, CHECK_INTERVAL_MS);

  return () => clearInterval(handle);
};

/**
 * "Nu live" link to a tournament's stream, shown only while the tournament is ongoing.
 * The page is ISR-cached for hours, so "ongoing" is decided in the browser against the
 * current time (and re-checked every minute), never at build time. The server render
 * and hydration show nothing.
 */
export const LiveStreamLink: React.FC<LiveStreamLinkProps> = ({ startDate, endDate, streamURL }) => {
  const isLive = useSyncExternalStore(
    subscribeToClock,
    () => {
      const now = Date.now();

      return startDate <= now && now < endDate;
    },
    () => false,
  );

  if (!isLive) {
    return null;
  }

  return (
    <a
      className={styles.link}
      href={streamURL}
      target="_blank"
      rel="noreferrer"
      aria-label="Nu live, kijk de stream"
    >
      <span className={styles.dot} aria-hidden="true" />
      Nu live
      <span aria-hidden="true">→</span>
    </a>
  );
};
