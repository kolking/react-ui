import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'title'> & {
  as?: HeadingElement;
  size?: HeadingElement;
  title: React.ReactNode;
  margin?: React.CSSProperties['margin'];
  marginStart?: React.CSSProperties['marginBlockStart'];
  marginEnd?: React.CSSProperties['marginBlockEnd'];
};

export const Heading = ({
  as: Element = 'h2',
  size = Element,
  title,
  margin,
  marginStart,
  marginEnd,
  className,
  children,
  style,
  ...props
}: HeadingProps) => {
  const fontSize = `var(--font-size-${size})`;
  const hasChildren = React.Children.toArray(children).length > 0;

  if (hasChildren) {
    return (
      <header
        {...props}
        data-heading={Element}
        className={cn(styles.heading, className)}
        style={{
          ...style,
          ...cssProps({ fontSize, margin, marginStart, marginEnd }),
        }}
      >
        <Element data-heading-title className={styles[Element]}>
          {title}
        </Element>
        <div data-heading-accessory className={styles.accessory}>
          {children}
        </div>
      </header>
    );
  }

  return (
    <Element
      {...props}
      data-heading={Element}
      className={cn(styles[Element], className)}
      style={{
        ...style,
        ...cssProps({ fontSize, margin, marginStart, marginEnd }),
      }}
    >
      {title}
    </Element>
  );
};
