import React from 'react';
import cn from 'classnames';

import { Icon } from '../Icon';
import { PolymorphicProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type StepperItemProps<T extends React.ElementType = 'div'> = PolymorphicProps<
  T,
  {
    as?: T;
    index?: number;
    active?: boolean;
    completed?: boolean;
    icon?: React.ReactElement;
  }
>;

export function StepperItem<T extends React.ElementType = 'div'>({
  as,
  index = 0,
  active,
  completed,
  icon,
  className,
  children,
  ...props
}: StepperItemProps<T>) {
  const Element = as ?? 'div';

  return (
    <Element
      {...props}
      data-stepper-item={index}
      data-stepper-active={active}
      data-stepper-completed={completed}
      className={cn(styles.step, className)}
    >
      <div data-stepper-index className={styles.step_index}>
        {icon ? icon : completed ? <Icon name="checkmark" /> : index + 1}
      </div>
      <div data-stepper-label className={styles.step_label}>
        {children}
      </div>
    </Element>
  );
}
