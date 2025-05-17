import { useCallback, useContext } from 'react';
import { useListItem } from '@floating-ui/react';
import cn from 'classnames';

import { MenuContext } from './MenuContext';
import { PolymorphicProps, wrapNode } from '../../utils/helpers';
import styles from './styles.module.scss';

export type MenuItemProps<T extends React.ElementType = 'button'> = PolymorphicProps<
  T,
  {
    as?: T;
    scheme?: 'default' | 'negative' | 'positive' | 'warning';
    title?: React.ReactNode;
    icon?: React.ReactElement;
  }
>;

export const MenuItem = <T extends React.ElementType = 'button'>({
  as,
  scheme = 'default',
  icon,
  title,
  children,
  className,
  onClick,
  ...props
}: MenuItemProps<T>) => {
  const { active, setOpen, getItemProps, onSelect } = useContext(MenuContext);
  const { ref, index } = useListItem();
  const isActive = index === active;
  const Element = as ?? 'button';

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onSelect?.(index);
      onClick?.(e);
    },
    [index, setOpen, onSelect, onClick],
  );

  return (
    <Element
      {...props}
      ref={ref}
      role="menuitem"
      data-menu-item
      data-active={isActive}
      tabIndex={isActive ? 0 : -1}
      type={!as ? 'button' : undefined}
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
    </Element>
  );
};
