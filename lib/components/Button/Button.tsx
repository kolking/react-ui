import React from 'react';
import cn from 'classnames';

import {
  cssProps,
  fixedForwardRef,
  PolymorphicProps,
  PolymorphicRef,
  wrapNode,
} from '../../utils/helpers';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss';

export type ButtonProps<T extends React.ElementType = 'button'> = PolymorphicProps<
  T,
  {
    as?: T;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'secondary' | 'tertiary';
    scheme?: 'default' | 'negative' | 'positive' | 'warning';
    minWidth?: React.CSSProperties['minWidth'];
    maxWidth?: React.CSSProperties['maxWidth'];
    busy?: boolean;
    title?: React.ReactNode;
    icon?: React.ReactElement;
    iconPosition?: 'start' | 'end';
  }
>;

function render<T extends React.ElementType = 'button'>(
  {
    as,
    variant = 'primary',
    scheme = 'default',
    size,
    minWidth,
    maxWidth,
    busy,
    title,
    icon,
    iconPosition = 'start',
    children,
    className,
    style,
    ...props
  }: ButtonProps<T>,
  ref: PolymorphicRef<T>,
) {
  const Element = as ?? 'button';

  return (
    <Element
      {...props}
      ref={ref}
      data-busy={busy}
      data-button={variant}
      data-scheme={scheme}
      aria-disabled={props.disabled}
      aria-live={busy ? 'polite' : undefined}
      className={cn(styles.button, styles[`${variant}-${scheme}`], className)}
      style={{ ...style, ...cssProps({ size, minWidth, maxWidth }) }}
    >
      {children ? (
        wrapNode(children, 'span')
      ) : (
        <>
          {iconPosition === 'start' && icon}
          {title && wrapNode(title, 'span')}
          {iconPosition === 'end' && icon}
        </>
      )}
      {busy && <Spinner overlay={true} />}
    </Element>
  );
}

export const Button = fixedForwardRef(render);
