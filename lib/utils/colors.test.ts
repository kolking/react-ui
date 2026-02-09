import { palette, PaletteColor, PaletteTint } from './colors';

const COLORS: PaletteColor[] = [
  'accent',
  'gray',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'pink',
];

const TINTS: PaletteTint[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800'];

describe('palette', () => {
  it('exports all configured colors', () => {
    expect(Object.keys(palette).sort()).toEqual(COLORS.slice().sort());
    expect(Object.keys(palette)).toHaveLength(COLORS.length);
  });

  it('each color-tint value is the correct CSS variable', () => {
    COLORS.forEach((c) => {
      TINTS.forEach((t) => {
        expect(palette[c][t]).toBe(`var(--color-${c}-${t})`);
      });
    });
  });
});
