import React, { useCallback, useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import {
  autoUpdate,
  Boundary,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';

import { getElementRef } from '../../utils/helpers';
import styles from './styles.module.scss';

type TriggerEvent =
  'hover' | 'focus' | 'click' | 'hover focus' | 'hover click' | 'focus click' | 'hover focus click';

export type PopoverProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> & {
  open?: boolean;
  event?: TriggerEvent;
  placement?: Placement;
  trigger: React.JSX.Element;
  offset?: number;
  modal?: boolean;
  disabled?: boolean;
  anchor?: Element | null;
  boundary?: Boundary;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  onToggle?: (open: boolean) => void;
};

export const Popover = ({
  open: controlledOpen,
  event = 'click',
  placement = 'bottom',
  trigger,
  offset: customOffset = 5,
  modal = false,
  anchor,
  boundary,
  disabled,
  minWidth,
  maxWidth,
  className,
  children,
  onToggle: setControlledOpen,
  ...props
}: PopoverProps) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const {
    refs: { setReference, setPositionReference, setFloating },
    context,
    floatingStyles,
  } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(customOffset),
      flip({ padding: 10, boundary }),
      shift({ padding: 5, boundary }),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
    useHover(context, { move: false, enabled: event.includes('hover') }),
    useFocus(context, { enabled: event.includes('focus') }),
    useClick(context, { enabled: event.includes('click') }),
  ]);

  const setTriggerRef = useCallback(
    (node: Element | null) => {
      setReference(node);
      // Find the closest parent with the data-floating-root attribute
      setPortalRoot((node?.closest('[data-floating-root]') as HTMLElement | null) ?? document.body);
    },
    [setReference],
  );

  // Preserve trigger component's ref
  const ref = useMergeRefs([setTriggerRef, getElementRef(trigger)]);

  useLayoutEffect(() => {
    // Separate events reference and the positioning reference
    if (anchor) {
      setPositionReference(anchor);
    }
  }, [setPositionReference, anchor]);

  if (disabled) {
    return trigger;
  }

  return (
    <>
      {React.cloneElement(trigger, getReferenceProps({ ...trigger.props, ref }))}
      {open && (
        <FloatingPortal root={portalRoot}>
          <FloatingFocusManager context={context} modal={modal} visuallyHiddenDismiss={modal}>
            <div
              {...getFloatingProps(props)}
              ref={setFloating}
              data-popover={placement}
              className={cn(styles.popover, className)}
              style={{ ...floatingStyles, minWidth, maxWidth }}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
