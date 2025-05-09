import { useCallback, useContext } from 'react';
import { useListItem } from '@floating-ui/react';
import cn from 'classnames';

import { MenuContext } from './MenuContext';
import { wrapNode } from '../../utils/helpers';
import styles from './styles.module.scss';

export type MenuItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> & {
  scheme?: 'default' | 'negative' | 'positive' | 'warning';
  icon?: React.ReactElement;
  title?: React.ReactNode;
};

export const MenuItem = ({
  scheme = 'default',
  icon,
  title,
  children,
  className,
  onClick,
  ...props
}: MenuItemProps) => {
  const { active, setOpen, getItemProps, onSelect } = useContext(MenuContext);
  const { ref, index } = useListItem();
  const isActive = index === active;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onSelect?.(index);
      onClick?.(e);
    },
    [index, setOpen, onSelect, onClick],
  );

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      role="menuitem"
      data-menu-item
      data-active={isActive}
      tabIndex={isActive ? 0 : -1}
      className={cn(styles.menuitem, styles[scheme], className)}
      {...getItemProps({ onClick: handleClick })}
    >
      {children ? (
        wrapNode(children, 'span')
      ) : (
        <>
          {icon}
          {title !== undefined && wrapNode(title, 'span')}
        </>
      )}
    </button>
  );
};
