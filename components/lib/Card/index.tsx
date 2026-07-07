import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  type?: 'simple' | 'custom';
  interaction?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Card = ({ type = 'simple', interaction = false, className, children }: CardProps) => (
  <div className={clsx(styles.card, styles[type], interaction && styles.interaction, className)}>
    {children}
  </div>
);
