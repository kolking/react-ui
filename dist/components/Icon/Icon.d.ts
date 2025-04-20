import { default as React } from 'react';
import { default as iconNames } from './icons';
type SVGProps = React.SVGProps<SVGSVGElement>;
type SVGComponent = React.FunctionComponent<SVGProps>;
type IconName = (typeof iconNames)[number];
type Size = string | number;
type Scheme = 'info' | 'warning' | 'error' | 'success' | 'neutral';
export type IconProps = SVGProps & {
    name?: IconName;
    size?: Size | [Size, Size];
    scheme?: Scheme;
    color?: string;
    svg?: SVGComponent;
};
export declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
export {};
