import { default as React } from 'react';
export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
    size?: string | number;
    color?: string;
    overlay?: boolean;
    overlayColor?: string;
};
export declare const Spinner: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
    size?: string | number;
    color?: string;
    overlay?: boolean;
    overlayColor?: string;
} & React.RefAttributes<HTMLSpanElement>>;
