import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

import styles from './styles.module.scss';

type TriggerEvent =
  | 'hover'
  | 'focus'
  | 'click'
  | 'hover focus'
  | 'hover click'
  | 'focus click'
  | 'hover focus click';

export type PopoverProps = React.HTMLAttributes<HTMLDivElement> & {
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
  const portalRef = useRef<HTMLElement | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const { refs, context, floatingStyles } = useFloating({
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

  // Preserve trigger component's ref
  const ref = useMergeRefs([
    refs.setReference,
    'ref' in trigger ? (trigger.ref as React.Ref<Element>) : null,
  ]);

  useEffect(() => {
    // Find the closest parent with the data-floating-root attribute
    const floatingRoot = refs.domReference.current?.closest('[data-floating-root]') as HTMLElement;
    if (!disabled && floatingRoot) {
      portalRef.current = floatingRoot;
    }
  }, [refs, disabled]);

  useLayoutEffect(() => {
    // Separate events reference and the positioning reference
    if (anchor) {
      refs.setPositionReference(anchor);
    }
  }, [refs, anchor]);

  if (disabled) {
    return trigger;
  }

  return (
    <>
      {React.cloneElement(trigger, getReferenceProps({ ref, ...trigger.props }))}
      {open && (
        <FloatingPortal root={portalRef}>
          <FloatingFocusManager context={context} modal={modal} visuallyHiddenDismiss={modal}>
            <div
              {...getFloatingProps(props)}
              ref={refs.setFloating}
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
