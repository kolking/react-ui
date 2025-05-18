import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type MenuSeparatorProps = React.HTMLAttributes<HTMLHRElement>;

export const MenuSeparator = ({ className, ...props }: MenuSeparatorProps) => (
  <hr {...props} role="separator" className={cn(styles.separator, className)} />
);
