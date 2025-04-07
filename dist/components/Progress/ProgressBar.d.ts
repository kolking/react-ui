import { default as React } from 'react';
export type ProgressBarProps = React.HTMLAttributes<HTMLDivElement> & {
    value: number | null;
    width?: string | number;
    height?: string | number;
    color?: string;
    trackColor?: string;
    margin?: React.CSSProperties['margin'];
    minWidth?: React.CSSProperties['minWidth'];
    maxWidth?: React.CSSProperties['maxWidth'];
};
export declare const ProgressBar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    value: number | null;
    width?: string | number;
    height?: string | number;
    color?: string;
    trackColor?: string;
    margin?: React.CSSProperties["margin"];
    minWidth?: React.CSSProperties["minWidth"];
    maxWidth?: React.CSSProperties["maxWidth"];
} & React.RefAttributes<HTMLDivElement>>;
