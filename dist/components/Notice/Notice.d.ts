import { default as React } from 'react';
type Scheme = 'info' | 'warning' | 'error' | 'success' | 'neutral';
export type NoticeProps = React.HTMLAttributes<HTMLDivElement> & {
    error?: unknown;
    scheme?: Scheme;
    variant?: 'default' | 'plain';
    layout?: 'horizontal' | 'vertical';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    icon?: React.ReactElement | null;
    accessory?: React.ReactNode;
    margin?: React.CSSProperties['margin'];
    padding?: React.CSSProperties['padding'];
};
export declare const Notice: ({ error, scheme, layout, variant, size, icon, accessory, margin, padding, className, style, children, ...props }: NoticeProps) => import("react/jsx-runtime").JSX.Element;
export {};
