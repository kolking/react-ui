import React, { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useInteractions,
  FloatingFocusManager,
  offset,
  flip,
  size,
  autoUpdate,
  FloatingPortal,
  FloatingList,
  Placement,
} from '@floating-ui/react';
import cn from 'classnames';

import { MenuContext, MenuContextProps } from './MenuContext';
import styles from './styles.module.scss';

export type MenuProps = React.HTMLAttributes<HTMLDivElement> & {
  placement?: Placement;
  trigger: React.JSX.Element;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
};

export const Menu = ({
  placement = 'bottom-start',
  trigger,
  minWidth,
  maxWidth,
  className,
  children,
  ...props
}: MenuProps) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [sizeBounds, setSizeBounds] = useState<React.CSSProperties>({});
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const portalRef = useRef<HTMLElement | null>(null);

  const { refs, context, floatingStyles } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      size({
        padding: 10,
        apply({ rects, availableWidth, availableHeight }) {
          flushSync(() => {
            setSizeBounds({
              minWidth: rects.reference.width,
              maxWidth: availableWidth,
              maxHeight: availableHeight,
            });
          });
        },
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useDismiss(context),
    useRole(context, { role: 'menu' }),
    useClick(context, { event: 'mousedown' }),
    useListNavigation(context, {
      listRef,
      loop: true,
      activeIndex: active,
      onNavigate: setActive,
    }),
  ]);

  const menuContext = useMemo<MenuContextProps>(
    () => ({ active, setOpen, getItemProps }),
    [active, getItemProps],
  );

  useEffect(() => {
    // Find the closest parent with the data-floating-root attribute
    const floatingRoot = refs.domReference.current?.closest('[data-floating-root]') as HTMLElement;
    if (floatingRoot) {
      portalRef.current = floatingRoot;
    }
  }, [refs]);

  return (
    <>
      {React.cloneElement(trigger, {
        ref: refs.setReference,
        'data-menu': 'trigger',
        ...getReferenceProps(trigger.props),
      })}
      <MenuContext.Provider value={menuContext}>
        {open && (
          <FloatingPortal root={portalRef}>
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                {...props}
                ref={refs.setFloating}
                data-menu="content"
                className={cn(styles.menu, className)}
                style={{ ...floatingStyles, ...sizeBounds, minWidth, maxWidth }}
                {...getFloatingProps()}
              >
                <FloatingList elementsRef={listRef}>{children}</FloatingList>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </MenuContext.Provider>
    </>
  );
};
