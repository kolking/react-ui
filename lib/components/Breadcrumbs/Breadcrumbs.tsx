import React from 'react';
import cn from 'classnames';

import { cssProps, PolymorphicProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type Breadcrumb<T extends React.ElementType = 'a'> = PolymorphicProps<
  T,
  {
    as?: T;
    label: React.ReactNode;
  }
>;

export type BreadcrumbsProps = React.OlHTMLAttributes<HTMLOListElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  items: Breadcrumb<React.ElementType>[];
  separator?: React.ReactNode;
  margin?: React.CSSProperties['margin'];
};

export const Breadcrumbs = ({
  size,
  items = [],
  separator = '›',
  margin,
  style,
  className,
  ...props
}: BreadcrumbsProps) => (
  <ol
    {...props}
    data-breadcrumbs
    className={cn(styles.breadcrumbs, className)}
    style={{ ...style, ...cssProps({ size, margin }) }}
  >
    {items.map(({ label, as, ...item }, index) => {
      const isLast = index === items.length - 1;
      const Element = as ?? (item.href ? 'a' : 'span');

      return (
        <li key={index}>
          <Element
            {...item}
            data-breadcrumbs-item={index}
            aria-current={isLast ? 'page' : undefined}
          >
            {label}
          </Element>
          {!isLast && (
            <span aria-hidden data-breadcrumbs-separator>
              {separator}
            </span>
          )}
        </li>
      );
    })}
  </ol>
);
