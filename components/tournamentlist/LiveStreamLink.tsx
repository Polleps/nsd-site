'use client';

import { useSyncExternalStore } from 'react';
import styles from './LiveStreamLink.module.css';

export interface LiveStreamLinkProps {
  startDate: number;
  endDate: number;
  streamURL: string;
  /** Shown instead of the link whenever the tournament isn't live. */
  children?: React.ReactNode;
}

const CHECK_INTERVAL_MS = 60_000;

const subscribeToClock = (onChange: () => void) => {
  const handle = setInterval(onChange, CHECK_INTERVAL_MS);

  return () => clearInterval(handle);
};

/**
 * "Nu live" link to a tournament's stream, shown only while the tournament is ongoing;
 * otherwise renders its children.
 * The page is ISR-cached for hours, so "ongoing" is decided in the browser against the
 * current time (and re-checked every minute), never at build time. The server render
 * and hydration show the children.
 */
export const LiveStreamLink: React.FC<LiveStreamLinkProps> = ({ startDate, endDate, streamURL, children }) => {
  const isLive = useSyncExternalStore(
    subscribeToClock,
    () => {
      const now = Date.now();

      return startDate <= now && now < endDate;
    },
    () => false,
  );

  if (!isLive) {
    return children;
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
