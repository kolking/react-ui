import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement[];
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  flexBasis?: React.CSSProperties['flexBasis'];
};

export const ButtonGroup = ({
  minWidth,
  maxWidth,
  flexBasis,
  className,
  style,
  children,
  ...props
}: ButtonGroupProps) => (
  <div
    {...props}
    data-button-group
    className={cn(styles.group, className)}
    style={{ ...style, ...cssProps({ flexBasis, minWidth, maxWidth }) }}
  >
    {children}
  </div>
);
