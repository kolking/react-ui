import { default as React } from 'react';
import { Placement } from '@floating-ui/react';
export type MenuProps = React.HTMLAttributes<HTMLDivElement> & {
    placement?: Placement;
    trigger: React.JSX.Element;
    minWidth?: React.CSSProperties['minWidth'];
    maxWidth?: React.CSSProperties['maxWidth'];
};
export declare const Menu: ({ placement, trigger, minWidth, maxWidth, className, children, ...props }: MenuProps) => import("react/jsx-runtime").JSX.Element;
