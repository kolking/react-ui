import { useCallback, useContext } from 'react';
import { useListItem } from '@floating-ui/react';
import cn from 'classnames';

import { MenuContext } from './MenuContext';
import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

function wrapNode(value: React.ReactNode) {
  return typeof value === 'string' ? <span>{value}</span> : value;
}

export type MenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  scheme?: 'default' | 'negative' | 'positive' | 'warning';
  icon?: React.ReactElement;
  title?: React.ReactNode;
};

export const MenuItem = ({
  size,
  scheme = 'default',
  icon,
  title,
  children,
  className,
  style,
  onClick,
  ...props
}: MenuItemProps) => {
  const { active, setOpen, getItemProps } = useContext(MenuContext);
  const { ref, index } = useListItem();
  const isActive = index === active;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onClick?.(e);
    },
    [setOpen, onClick],
  );

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      role="menuitem"
      data-menu="item"
      data-active={isActive}
      tabIndex={isActive ? 0 : -1}
      className={cn(styles.menuitem, styles[scheme], className)}
      style={{ ...style, ...cssProps({ size }) }}
      {...getItemProps({ onClick: handleClick })}
    >
      {children ? (
        wrapNode(children)
      ) : (
        <>
          {icon}
          {title && wrapNode(title)}
        </>
      )}
    </button>
  );
};
