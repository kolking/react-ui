import React from 'react';
import { Button, ButtonProps } from '../Button';

export type ToggleButtonProps = Omit<ButtonProps, 'variant'> & {
  selected?: boolean;
};

export const ToggleButton = React.forwardRef<typeof Button, ToggleButtonProps>(
  ({ selected = false, role, ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      role={role}
      aria-checked={role === 'radio' ? selected : undefined}
      aria-pressed={role !== 'radio' ? selected : undefined}
      data-selected={selected}
      variant={selected ? 'primary' : 'secondary'}
    />
  ),
);
