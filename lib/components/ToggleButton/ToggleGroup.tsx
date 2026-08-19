import cn from 'classnames';
import React, { useState } from 'react';
import { Composite, CompositeItem } from '@floating-ui/react';

import { ToggleButtonProps } from './ToggleButton';
import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type ToggleGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  selected?: number;
  defaultSelected?: number;
  disabled?: boolean;
  children: React.ReactElement[];
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  buttonWidth?: React.CSSProperties['gridAutoColumns'];
  onSelect?: (index: number) => void;
};

export const ToggleGroup = ({
  selected,
  defaultSelected,
  disabled,
  minWidth,
  maxWidth,
  buttonWidth,
  className,
  style,
  children,
  onSelect,
  ...props
}: ToggleGroupProps) => {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);

  const isControlled = selected !== undefined;
  const selectedIndex = isControlled ? selected : internalSelected;

  return (
    <Composite
      {...props}
      role="radiogroup"
      data-toggle-group
      className={cn(styles.group, className)}
      style={{ ...style, ...cssProps({ minWidth, maxWidth, buttonWidth }) }}
    >
      {React.Children.map(children, (child, index) => {
        const button = child as React.ReactElement<ToggleButtonProps>;

        return (
          <CompositeItem
            render={React.cloneElement(button, {
              role: 'radio',
              disabled: button.props?.disabled ?? disabled,
              selected: button.props?.selected ?? index === selectedIndex,
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isControlled) {
                  setInternalSelected(index);
                }
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
