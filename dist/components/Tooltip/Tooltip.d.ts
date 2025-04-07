import { default as React } from 'react';
import { Placement } from '@floating-ui/react';
type Trigger = 'hover' | 'focus' | 'click' | 'hover focus' | 'hover click' | 'focus click' | 'hover focus click';
export type TooltipProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'content' | 'children'> & {
    trigger?: Trigger;
    disabled?: boolean;
    placement?: Placement;
    content: React.ReactNode;
    children: React.JSX.Element;
    minWidth?: React.CSSProperties['minWidth'];
    maxWidth?: React.CSSProperties['maxWidth'];
};
export declare const Tooltip: ({ trigger, placement, content, disabled, minWidth, maxWidth, className, children, ...props }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
export {};
