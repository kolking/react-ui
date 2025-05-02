import { Button, ButtonProps } from '../Button';

export type ToggleButtonProps = Omit<ButtonProps, 'variant'> & {
  selected?: boolean;
};

export const ToggleButton = ({ selected = false, role, ...props }: ToggleButtonProps) => (
  <Button
    {...props}
    role={role}
    aria-checked={role === 'radio' ? selected : undefined}
    aria-pressed={role !== 'radio' ? selected : undefined}
    data-selected={selected}
    variant={selected ? 'primary' : 'secondary'}
  />
);
