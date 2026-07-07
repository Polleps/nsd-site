import type { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../Button';
import styles from './Error.module.css';

export interface ErrorProps {
  code: number;
  title: string;
  children?: ReactNode;
}

export const Error: React.FC<PropsWithChildren<ErrorProps>> = ({ code, title, children }) => (
  <main className={styles.wrapper}>
    <div className={styles.card}>
      <h1 className={styles.heading}><span className={styles.errCode}>{code}</span> {title}</h1>
      {children}
      <Button className={styles.button} href="/">
        <span>
          Naar Homepagina
        </span>
      </Button>
    </div>
  </main>
);
