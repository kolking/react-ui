import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Composite, CompositeItem } from '@floating-ui/react';

import { ToggleButtonProps } from './ToggleButton';
import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type ToggleGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  selected?: number;
  disabled?: boolean;
  children: React.ReactElement[];
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  flexBasis?: React.CSSProperties['flexBasis'];
  onSelect?: (index: number) => void;
};

export const ToggleGroup = ({
  selected = 0,
  disabled,
  minWidth,
  maxWidth,
  flexBasis,
  className,
  style,
  children,
  onSelect,
  ...props
}: ToggleGroupProps) => {
  const [selectedIndex, setSelectedIndex] = useState(selected);

  useEffect(() => {
    setSelectedIndex(selected);
  }, [selected]);

  return (
    <Composite
      {...props}
      role="radiogroup"
      data-toggle-group
      className={cn(styles.group, className)}
      style={{ ...style, ...cssProps({ flexBasis, minWidth, maxWidth }) }}
    >
      {React.Children.map(children, (child, index) => {
        const button = child as React.ReactElement<ToggleButtonProps>;

        return (
          <CompositeItem
            render={React.cloneElement(button, {
              role: 'radio',
              disabled: disabled || button.props?.disabled,
              selected: index === selectedIndex,
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                setSelectedIndex(index);
                onSelect?.(index);
                button.props?.onClick?.(e);
              },
            })}
          />
        );
      })}
    </Composite>
  );
};
