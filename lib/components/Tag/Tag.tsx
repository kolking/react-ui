import React from 'react';
import cn from 'classnames';

import { cssProps, wrapNode } from '../../utils/helpers';
import { PaletteColor } from '../../utils/colors';
import styles from './styles.module.scss';

export type TagProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'solid';
  scheme?: PaletteColor;
  title?: React.ReactNode;
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end';
};

export const Tag = ({
  size,
  variant = 'default',
  scheme = 'gray',
  title,
  icon,
  iconPosition = 'start',
  className,
  style,
  children,
  ...props
}: TagProps) => (
  <span
    {...props}
    data-tag={variant}
    data-scheme={scheme}
    className={cn(styles.tag, styles[`${variant}-${scheme}`], className)}
    style={{ ...style, ...cssProps({ size }) }}
  >
    {children ? (
      wrapNode(children, 'span')
    ) : (
      <>
        {iconPosition === 'start' && icon}
        {title !== undefined && wrapNode(title, 'span')}
        {iconPosition === 'end' && icon}
      </>
    )}
  </span>
);
