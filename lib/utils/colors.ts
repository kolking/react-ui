const theme = {
  colors: [
    'accent',
    'gray',
    'brown',
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'mint',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'purple',
    'plum',
    'pink',
  ],
  tints: ['50', '100', '200', '300', '400', '500', '600', '700', '800'],
} as const;

export type PaletteColor = (typeof theme.colors)[number];
export type PaletteTint = (typeof theme.tints)[number];

export type Palette = {
  [key in PaletteColor]: {
    [key in PaletteTint]: string;
  };
};

export const palette = theme.colors.reduce(
  (prevColor, currColor) => ({
    ...prevColor,
    [currColor]: theme.tints.reduce(
      (prevTint, currTint) => ({
        ...prevTint,
        [currTint]: `var(--color-${currColor}-${currTint})`,
      }),
      {},
    ),
  }),
  {} as Palette,
);
