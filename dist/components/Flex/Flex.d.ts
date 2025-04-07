import { default as React } from 'react';
import { PolymorphicProps } from '../../utils/helpers';
export type FlexProps<T extends React.ElementType = 'div'> = PolymorphicProps<T, {
    as?: T;
    direction?: React.CSSProperties['flexDirection'];
    gap?: React.CSSProperties['gap'];
    align?: React.CSSProperties['alignItems'];
    justify?: React.CSSProperties['justifyContent'];
    wrap?: React.CSSProperties['flexWrap'];
    marginStart?: React.CSSProperties['marginBlockStart'];
    marginEnd?: React.CSSProperties['marginBlockEnd'];
}>;
export declare const Flex: <T extends React.ElementType = "div">(props: {
    as?: T | undefined;
    direction?: React.CSSProperties["flexDirection"];
    gap?: React.CSSProperties["gap"];
    align?: React.CSSProperties["alignItems"];
    justify?: React.CSSProperties["justifyContent"];
    wrap?: React.CSSProperties["flexWrap"];
    marginStart?: React.CSSProperties["marginBlockStart"];
    marginEnd?: React.CSSProperties["marginBlockEnd"];
} & Omit<React.PropsWithoutRef<React.ComponentProps<T>>, "direction" | "as" | "align" | "wrap" | "justify" | "gap" | "marginStart" | "marginEnd"> & React.RefAttributes<unknown>) => React.ReactElement | null;
