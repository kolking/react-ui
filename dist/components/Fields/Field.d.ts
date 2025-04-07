import { default as React } from 'react';
export interface FieldConfig {
    id?: string;
    label?: React.ReactNode;
    help?: React.ReactNode;
    tooltip?: React.ReactNode;
    required?: boolean;
    className?: string;
    minWidth?: React.CSSProperties['minWidth'];
    maxWidth?: React.CSSProperties['maxWidth'];
}
export type FieldProps = React.HTMLAttributes<HTMLDivElement> & FieldConfig;
export declare const Field: ({ id, label, help, tooltip, required, minWidth, maxWidth, className, children, ...props }: FieldProps) => import("react/jsx-runtime").JSX.Element;
