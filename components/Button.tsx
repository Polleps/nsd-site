import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

export type ButtonProps = ComponentPropsWithoutRef<'a'>;

export const Button = ({ className, children, ...rest }: ButtonProps) => (
  <a className={clsx(styles.button, className)} {...rest}>
    {children}
  </a>
);
