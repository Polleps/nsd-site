import type { CSSProperties, ReactNode } from 'react';
import styles from './Slot.module.css';

export interface SlotProps {
  area: string;
  children: ReactNode;
}

export const Slot = ({ children, area }: SlotProps) => (
  <div className={styles.slot} style={{ '--slot-area': area } as CSSProperties}>
    {children}
  </div>
);
