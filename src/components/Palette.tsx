import React from 'react';
import { palette, PaletteColor, PaletteTint } from '@lib';

import styles from './styles.module.scss';

const colors = Object.keys(palette) as PaletteColor[];
const tints = Object.keys(palette.accent) as PaletteTint[];

export const Palette = () => (
  <dl className={styles.palette}>
    <dt />
    {tints.map((tint) => (
      <dt key={tint}>{tint}</dt>
    ))}
    {colors.map((color) => (
      <React.Fragment key={color}>
        <dt>{color}</dt>
        {tints.map((tint) => (
          <dd key={`${color}-${tint}`} style={{ backgroundColor: palette[color][tint] }} />
        ))}
      </React.Fragment>
    ))}
  </dl>
);
