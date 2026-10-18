import React, { useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import {
  autoUpdate,
  Boundary,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  ReferenceType,
  VirtualElement,
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

import { getElementRef, getFloatingRoot } from '../../utils/helpers';
import styles from './styles.module.scss';

type TriggerEvent =
  'hover' | 'focus' | 'click' | 'hover focus' | 'hover click' | 'focus click' | 'hover focus click';

type BasePopoverProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> & {
  open?: boolean;
  event?: TriggerEvent;
  placement?: Placement;
  offset?: number;
  modal?: boolean;
  disabled?: boolean;
  boundary?: Boundary;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  onToggle?: (open: boolean) => void;
};

export type PopoverProps = BasePopoverProps &
  (
    | { trigger: React.JSX.Element; anchor?: ReferenceType | null }
    | { trigger?: never; anchor: ReferenceType; open: boolean }
  );

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
  const hasAnchor = typeof Element !== 'undefined' && anchor instanceof Element;
  const anchorElement = hasAnchor ? anchor : (anchor as VirtualElement | null)?.contextElement;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const {
    refs: { setReference, setPositionReference, setFloating },
    elements: { domReference },
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

  // Find the closest parent with the [data-floating-root] attribute for a trigger.
  // Fallback to document.body for a triggerless virtual anchor without contextElement.
  const portalRoot = trigger
    ? getFloatingRoot(domReference)
    : getFloatingRoot(anchorElement ?? null, true);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
    useHover(context, { move: false, enabled: Boolean(trigger) && event.includes('hover') }),
    useFocus(context, { enabled: Boolean(trigger) && event.includes('focus') }),
    useClick(context, { enabled: Boolean(trigger) && event.includes('click') }),
  ]);

  // Preserve trigger component's ref
  const ref = useMergeRefs([setReference, trigger ? getElementRef(trigger) : undefined]);

  useLayoutEffect(() => {
    // Separate events reference and the positioning reference
    if (anchor || domReference) {
      setPositionReference(anchor ?? domReference);
    }
  }, [setPositionReference, anchor, domReference]);

  if (disabled) {
    return trigger ?? null;
  }

  return (
    <>
      {trigger && React.cloneElement(trigger, getReferenceProps({ ...trigger.props, ref }))}
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
