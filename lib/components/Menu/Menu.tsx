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
  size as floatingSize,
  autoUpdate,
  FloatingPortal,
  FloatingList,
  Placement,
  useMergeRefs,
} from '@floating-ui/react';
import cn from 'classnames';

import { MenuContext, MenuContextProps } from './MenuContext';
import { cssProps, getElementRef } from '../../utils/helpers';
import styles from './styles.module.scss';

export type MenuProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  placement?: Placement;
  trigger: React.JSX.Element;
  offset?: number;
  unmount?: boolean;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  minHeight?: React.CSSProperties['minHeight'];
  maxHeight?: React.CSSProperties['maxHeight'];
  onSelect?: (index: number) => void;
};

export const Menu = ({
  size,
  placement = 'bottom-start',
  trigger,
  offset: customOffset = 5,
  unmount = true,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  className,
  children,
  onSelect,
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
      offset(customOffset),
      flip({ padding: 10 }),
      floatingSize({
        padding: 10,
        apply({ rects, availableWidth, availableHeight }) {
          flushSync(() => {
            setSizeBounds({
              minHeight,
              minWidth: minWidth ?? rects.reference.width,
              maxWidth: maxWidth ?? availableWidth,
              maxHeight: maxHeight ?? availableHeight,
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
    () => ({ active, setOpen, getItemProps, onSelect }),
    [active, getItemProps, onSelect],
  );

  // Preserve trigger component's ref
  const ref = useMergeRefs([refs.setReference, getElementRef(trigger)]);

  useEffect(() => {
    // Find the closest parent with the data-floating-root attribute
    const floatingRoot = refs.domReference.current?.closest('[data-floating-root]') as HTMLElement;
    portalRef.current = floatingRoot ?? document.body;
  }, [refs]);

  return (
    <>
      {React.cloneElement(
        trigger,
        getReferenceProps({ ...trigger.props, ref, 'data-menu-trigger': true }),
      )}
      <MenuContext.Provider value={menuContext}>
        {(open || !unmount) && (
          <FloatingPortal root={portalRef.current}>
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                {...getFloatingProps(props)}
                ref={refs.setFloating}
                data-open={open}
                data-menu={placement}
                className={cn(styles.menu, className)}
                style={{ ...floatingStyles, ...sizeBounds, ...cssProps({ size }) }}
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
