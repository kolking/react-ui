import cn from 'classnames';
import React from 'react';

import { cssProps, fixedForwardRef, PolymorphicProps, PolymorphicRef } from '../../utils/helpers';
import styles from './styles.module.scss';

export type FlexProps<T extends React.ElementType = 'div'> = PolymorphicProps<
  T,
  {
    as?: T;
    direction?: React.CSSProperties['flexDirection'];
    gap?: React.CSSProperties['gap'];
    align?: React.CSSProperties['alignItems'];
    justify?: React.CSSProperties['justifyContent'];
    wrap?: React.CSSProperties['flexWrap'];
    marginStart?: React.CSSProperties['marginBlockStart'];
    marginEnd?: React.CSSProperties['marginBlockEnd'];
  }
>;

function render<T extends React.ElementType = 'div'>(
  {
    as,
    direction = 'row',
    gap,
    align,
    justify,
    wrap,
    marginStart,
    marginEnd,
    className,
    style,
    ...props
  }: FlexProps<T>,
  ref: PolymorphicRef<T>,
) {
  const Element = as ?? 'div';

  return (
    <Element
      {...props}
      ref={ref}
      data-flex={direction}
      className={cn(styles.flex, className)}
      style={{
        ...style,
        ...cssProps({ gap, align, justify, direction, wrap, marginStart, marginEnd }),
      }}
    />
  );
}

export const Flex = fixedForwardRef(render);
