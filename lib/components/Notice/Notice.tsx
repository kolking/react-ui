import cn from 'classnames';
import React from 'react';

import { cssProps, getErrorMessage } from '../../utils/helpers';
import { Icon, IconProps } from '../Icon';
import styles from './styles.module.scss';

type Scheme = 'info' | 'warning' | 'error' | 'success' | 'neutral';

const icons: { [key: string]: IconProps['name'] } = {
  info: 'info-circle',
  warning: 'warning',
  error: 'error-circle',
  success: 'checkmark-circle',
  neutral: 'info-outline',
};

export type NoticeProps = React.HTMLAttributes<HTMLDivElement> & {
  error?: unknown;
  scheme?: Scheme;
  variant?: 'default' | 'subtle';
  layout?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactElement | null;
  accessory?: React.ReactNode;
  margin?: React.CSSProperties['margin'];
  padding?: React.CSSProperties['padding'];
};

export const Notice = ({
  error,
  scheme = error ? 'error' : 'neutral',
  layout = 'horizontal',
  variant = 'default',
  size,
  icon,
  accessory,
  margin,
  padding,
  className,
  style,
  children,
  ...props
}: NoticeProps) => (
  <div
    {...props}
    data-notice={scheme}
    className={cn(styles.container, styles[scheme], styles[layout], styles[variant], className)}
    style={{ ...style, ...cssProps({ size, margin, padding }) }}
  >
    <div className={styles.content}>
      {icon !== undefined ? icon : icons[scheme] && <Icon name={icons[scheme]} />}
      <div className={styles.message}>{error ? getErrorMessage(error) : children}</div>
    </div>
    {accessory && <div className={styles.accessory}>{accessory}</div>}
  </div>
);
