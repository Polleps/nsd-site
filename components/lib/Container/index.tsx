import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  size?: 'large';
  className?: string;
  children?: ReactNode;
}

export const Container = ({ size, className, children }: ContainerProps) => (
  <div className={clsx(styles.container, size === 'large' && styles.large, className)}>
    {children}
  </div>
);
