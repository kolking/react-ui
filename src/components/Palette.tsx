import React from 'react';
import styles from './styles.module.scss';

export const palette = {
  colors: [
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'purple',
    'brown',
    'accent',
  ],
  tints: [50, 100, 200, 300, 400, 500, 600, 700, 800],
};

export const Palette = () => (
  <dl className={styles.palette}>
    <dt />
    {palette.tints.map((tint, index) => (
      <dt key={index}>{tint}</dt>
    ))}
    {palette.colors.map((color) => (
      <React.Fragment key={color}>
        <dt>{color}</dt>
        {palette.tints.map((tint) => (
          <dd key={tint} style={{ backgroundColor: `var(--color-${color}-${tint})` }} />
        ))}
      </React.Fragment>
    ))}
  </dl>
);
