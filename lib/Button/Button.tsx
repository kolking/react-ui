import React from 'react';
import styles from './styles.module.scss';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const Button = ({ title, ...props }: ButtonProps) => (
  <button className={styles.button} {...props}>
    {title}
  </button>
);
