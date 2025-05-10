import React from 'react';
import { Composite, CompositeItem } from '@floating-ui/react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { cssProps } from '../../utils/helpers';

export type ToggleGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  variant?: 'inline' | 'block';
  selected: number;
  disabled?: boolean;
  equalWidth?: boolean;
  children: React.ReactElement[];
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  onSelect: (index: number) => void;
};

export const ToggleGroup = ({
  variant = 'inline',
  selected,
  disabled,
  equalWidth,
  minWidth,
  maxWidth,
  className,
  style,
  children,
  onSelect,
  ...props
}: ToggleGroupProps) => {
  const display = variant === 'block' ? 'flex' : undefined;
  const flexBasis = equalWidth ? '0' : undefined;

  return (
    <Composite
      {...props}
      role="radiogroup"
      data-toggle-group
      className={cn(styles.group, styles[variant], className)}
      style={{ ...style, ...cssProps({ display, flexBasis, minWidth, maxWidth }) }}
    >
      {React.Children.map(children, (child, index) => (
        <CompositeItem
          render={React.cloneElement(child, {
            role: 'radio',
            disabled,
            selected: index === selected,
            onClick: () => onSelect(index),
          })}
        />
      ))}
    </Composite>
  );
};
