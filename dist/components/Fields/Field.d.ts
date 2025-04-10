import { default as React } from 'react';
export interface FieldConfig {
    id?: string;
    label?: React.ReactNode;
    labelAccessory?: React.ReactNode;
    help?: React.ReactNode;
    required?: boolean;
    className?: string;
    minWidth?: React.CSSProperties['minWidth'];
    maxWidth?: React.CSSProperties['maxWidth'];
}
export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    label?: React.ReactNode;
    required?: boolean;
};
export declare const FieldLabel: ({ label, required, className, children, ...props }: FieldLabelProps) => import("react/jsx-runtime").JSX.Element;
export type FieldHelpProps = React.HTMLAttributes<HTMLDivElement>;
export declare const FieldHelp: ({ className, children, ...props }: FieldHelpProps) => import("react/jsx-runtime").JSX.Element;
export type FieldProps = React.HTMLAttributes<HTMLDivElement> & FieldConfig;
export declare const Field: ({ id, label, labelAccessory, help, required, minWidth, maxWidth, className, children, ...props }: FieldProps) => import("react/jsx-runtime").JSX.Element;
