import React from 'react';
import cn from 'classnames';

import {
  cssProps,
  fixedForwardRef,
  PolymorphicProps,
  PolymorphicRef,
  wrapNode,
} from '../../utils/helpers';
import { PaletteColor } from '../../utils/colors';
import styles from './styles.module.scss';

export type TagProps<T extends React.ElementType = 'span'> = PolymorphicProps<
  T,
  {
    as?: T;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'solid' | 'plain';
    scheme?: PaletteColor;
    title?: React.ReactNode;
    icon?: React.ReactElement;
    iconPosition?: 'start' | 'end';
  }
>;

function render<T extends React.ElementType = 'span'>(
  {
    as,
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
  }: TagProps<T>,
  ref: PolymorphicRef<T>,
) {
  const Element = as ?? 'span';

  return (
    <Element
      {...props}
      ref={ref}
      data-tag={variant}
      data-scheme={scheme}
      className={cn(styles.tag, styles[`${variant}-${scheme}`], className)}
      style={{ ...style, ...cssProps({ size }) }}
    >
      {iconPosition === 'start' && icon}
      {wrapNode(children || title, 'span')}
      {iconPosition === 'end' && icon}
    </Element>
  );
}

export const Tag = fixedForwardRef(render);
