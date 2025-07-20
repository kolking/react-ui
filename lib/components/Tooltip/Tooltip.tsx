import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  useMergeRefs,
  useRole,
} from '@floating-ui/react';

import { getElementRef } from '../../utils/helpers';
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
  offset?: number;
  anchor?: Element | null;
  content: React.ReactNode;
  children: React.JSX.Element;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
};

export const Tooltip = ({
  trigger = 'hover focus',
  placement = 'top',
  offset: customOffset = 8,
  anchor,
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
      offset(customOffset),
      flip({ padding: 10 }),
      shift({ padding: 5 }),
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

  // Preserve child component's ref
  const ref = useMergeRefs([refs.setReference, getElementRef(children)]);

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
    return children;
  }

  return (
    <>
      {React.cloneElement(children, getReferenceProps({ ...children.props, ref }))}
      {open && (
        <FloatingPortal root={portalRef}>
          <div
            {...getFloatingProps(props)}
            ref={refs.setFloating}
            data-tooltip={placement}
            className={cn(styles.tooltip, className)}
            style={{ ...floatingStyles, minWidth, maxWidth }}
          >
            <FloatingArrow
              width={12}
              height={6}
              ref={arrowRef}
              context={context}
              className={styles.arrow}
              staticOffset={staticOffset ? 8 : null}
            />
            <div data-tooltip-content className={styles.content}>
              {content}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
