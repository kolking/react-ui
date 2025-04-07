import { default as React } from 'react';
export type ProgressCircularProps = React.HTMLAttributes<HTMLDivElement> & {
    min?: number;
    max?: number;
    value: number | null;
    size?: string | number;
    thickness?: number;
    linecap?: 'round';
    color?: string;
    trackColor?: string;
    margin?: React.CSSProperties['margin'];
};
export declare const ProgressCircular: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    min?: number;
    max?: number;
    value: number | null;
    size?: string | number;
    thickness?: number;
    linecap?: "round";
    color?: string;
    trackColor?: string;
    margin?: React.CSSProperties["margin"];
} & React.RefAttributes<HTMLDivElement>>;
