import { Tooltip, TooltipProps } from '../Tooltip';
import styles from './styles/input.module.scss';

export const ValidationTooltip = (props: TooltipProps) => (
  <Tooltip
    {...props}
    disabled={!props.content}
    placement="top-start"
    trigger="hover focus click"
    className={styles.tooltip}
  />
);
