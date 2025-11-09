import cn from 'classnames';

import { Tooltip, TooltipProps } from '../Tooltip';
import styles from './styles/input.module.scss';

export const ValidationTooltip = ({ content, className, ...props }: TooltipProps) => (
  <Tooltip
    placement="top-start"
    trigger="hover focus click"
    {...props}
    content={content}
    data-tooltip-validation
    disabled={!content || typeof content !== 'string'}
    className={cn(styles.tooltip, className)}
  />
);
