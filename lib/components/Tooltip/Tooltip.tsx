import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
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
  useRole,
} from '@floating-ui/react';

import styles from './styles.module.scss';

type Trigger =
  | 'hover'
  | 'focus'
  | 'click'
  | 'hover focus'
  | 'hover click'
  | 'focus click'
  | 'hover focus click';

export type TooltipProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'content' | 'children'> & {
  trigger?: Trigger;
  disabled?: boolean;
  placement?: Placement;
  content: React.ReactNode;
  children: React.JSX.Element;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
};

export const Tooltip = ({
  trigger = 'hover focus',
  placement = 'top',
  content,
  disabled,
  minWidth,
  maxWidth,
  className,
  children,
  ...props
}: TooltipProps) => {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const portalRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [staticOffset, setStaticOffset] = useState(false);

  const { refs, context, floatingStyles } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      shift(),
      arrow(({ placement, rects }) => {
        setStaticOffset(
          rects.floating.width < rects.reference.width &&
            (placement.endsWith('-start') || placement.endsWith('-end')),
        );
        return { element: arrowRef, padding: 8 };
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useRole(context, { role: 'tooltip' }),
    useHover(context, { move: false, enabled: trigger.includes('hover') }),
    useFocus(context, { enabled: trigger.includes('focus') }),
    useClick(context, { enabled: trigger.includes('click') }),
  ]);

  useEffect(() => {
    // Find the closest parent with the data-floating-root attribute
    const floatingRoot = refs.domReference.current?.closest('[data-floating-root]') as HTMLElement;
    if (!disabled && floatingRoot) {
      portalRef.current = floatingRoot;
    }
  }, [refs, disabled]);

  if (disabled) {
    return children;
  }

  return (
    <>
      {React.cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(props),
      })}
      {open && (
        <FloatingPortal root={portalRef}>
          <div
            {...props}
            ref={refs.setFloating}
            data-tooltip={placement}
            className={cn(styles.tooltip, className)}
            style={{ ...floatingStyles, minWidth, maxWidth }}
            {...getFloatingProps()}
          >
            <FloatingArrow
              width={12}
              height={6}
              ref={arrowRef}
              context={context}
              className={styles.arrow}
              staticOffset={staticOffset ? 8 : null}
            />
            <div className={styles.content}>{content}</div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
