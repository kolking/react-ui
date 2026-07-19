import React from 'react';
import cn from 'classnames';

import { cssProps } from '../../utils/helpers';
import { StepperItemProps } from './StepperItem';

import styles from './styles.module.scss';

export type StepperProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  activeStep?: number;
  variant?: 'horizontal' | 'vertical';
  labelPlacement?: 'inline' | 'block' | 'responsive';
  breakpoint?: string | number;
  children: React.ReactElement[];
};

export const Stepper = ({
  size,
  activeStep = 0,
  variant = 'horizontal',
  labelPlacement = 'block',
  breakpoint,
  className,
  style,
  children,
  ...props
}: StepperProps) => {
  const variantClass = variant === 'vertical' ? variant : `${variant}-${labelPlacement}`;

  return (
    <div
      {...props}
      data-stepper
      className={cn(styles.stepper, styles[variantClass], className)}
      style={{ ...style, ...cssProps({ size, breakpoint }) }}
    >
      {React.Children.map(children, (child, index) => {
        const item = child as React.ReactElement<StepperItemProps>;
        const active = index === activeStep;
        const completed = index < activeStep;

        return (
          <>
            {index > 0 && <div data-stepper-separator className={styles.separator} />}
            {React.cloneElement(item, { index, active, completed })}
          </>
        );
      })}
    </div>
  );
};
