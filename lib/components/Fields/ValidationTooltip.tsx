import cn from 'classnames';

import { Tooltip, TooltipProps } from '../Tooltip';
import styles from './styles/input.module.scss';

export const ValidationTooltip = ({ className, ...props }: TooltipProps) => (
  <Tooltip
    placement="top-start"
    trigger="hover focus click"
    {...props}
    data-tooltip-validation
    disabled={!props.content}
    className={cn(styles.tooltip, className)}
  />
);
