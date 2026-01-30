import cn from 'classnames';
import React from 'react';

import { cssProps, getErrorMessage } from '../../utils/helpers';
import { Icon, IconProps } from '../Icon';
import styles from './styles.module.scss';

type Scheme = 'info' | 'warning' | 'error' | 'success' | 'neutral';

type SchemeIcons = {
  [key in Scheme]: {
    name: IconProps['name'];
    label: string;
  };
};

const icons: SchemeIcons = {
  info: {
    name: 'info-circle',
    label: 'info icon',
  },
  warning: {
    name: 'warning',
    label: 'warning icon',
  },
  error: {
    name: 'error-circle',
    label: 'error icon',
  },
  success: {
    name: 'checkmark-circle',
    label: 'checkmark icon',
  },
  neutral: {
    name: 'info-outline',
    label: 'info icon',
  },
};

const getSchemeIcon = (scheme: Scheme) =>
  icons[scheme] && <Icon name={icons[scheme].name} aria-label={icons[scheme].label} />;

export type NoticeProps = React.HTMLAttributes<HTMLDivElement> & {
  error?: unknown;
  scheme?: Scheme;
  variant?: 'default' | 'plain';
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
    data-layout={layout}
    className={cn(styles.container, styles[scheme], styles[layout], styles[variant], className)}
    style={{ ...style, ...cssProps({ size, margin, padding }) }}
  >
    <div data-notice-content className={styles.content}>
      {icon !== undefined ? icon : getSchemeIcon(scheme)}
      <div data-notice-message className={styles.message}>
        {error ? getErrorMessage(error) : children}
      </div>
    </div>
    {accessory && (
      <div data-notice-accessory className={styles.accessory}>
        {accessory}
      </div>
    )}
  </div>
);
