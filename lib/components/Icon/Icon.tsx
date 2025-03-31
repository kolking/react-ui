import React from 'react';
import cn from 'classnames';

import iconNames from './icons';
import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

type SVGProps = React.SVGProps<SVGSVGElement>;
type SVGComponent = React.FunctionComponent<SVGProps>;
type Icons = Record<string, SVGComponent>;
type IconName = (typeof iconNames)[number];
type Size = string | number;

// https://vitejs.dev/guide/features.html#glob-import
const icons: Icons = import.meta.glob<SVGComponent>('../../assets/icons/*.svg', {
  query: '?react',
  import: 'default',
  eager: true,
});

Object.keys(icons).map((path) => {
  const name = path.split('/').pop()?.replace('.svg', '');
  if (name) {
    icons[name] = icons[path];
    delete icons[path];
  }
});

export type IconProps = SVGProps & {
  name?: IconName;
  size?: Size | [Size, Size];
  color?: string;
  svg?: SVGComponent;
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, color, svg, style, className, ...props }, ref) => {
    const [width, height] = Array.isArray(size) ? size : [size, size];
    const Svg = svg || (name ? icons[name] : undefined);

    return !Svg ? null : (
      <Svg
        {...props}
        ref={ref}
        focusable={false}
        aria-hidden={!props['aria-label'] || undefined}
        data-icon={name || Svg.name}
        className={cn(styles.icon, className)}
        style={{ ...style, ...cssProps({ color, width, height }) }}
      />
    );
  },
);
