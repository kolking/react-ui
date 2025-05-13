import React, { useState } from 'react';
import { Flex, Heading, Icon, palette, PaletteColor, PaletteTint, Tag } from '@lib';

import styles from './styles.module.scss';

const colors = Object.keys(palette) as PaletteColor[];
const tints = Object.keys(palette.accent) as PaletteTint[];

function getColor(variable: string) {
  const root = document.getElementById('root');

  if (root) {
    root.style.fill = variable;
    const computedStyle = getComputedStyle(root);
    const rgb = computedStyle.getPropertyValue('fill');
    const arr = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);

    if (arr) {
      const r = parseInt(arr[1]);
      const g = parseInt(arr[2]);
      const b = parseInt(arr[3]);
      const hex = (0x1000000 | (b | (g << 8) | (r << 16))).toString(16);

      return {
        hex: hex.replace(/^./, '#').toUpperCase(),
        rgb: { r, g, b },
      };
    }
  }

  return { hex: '#000000', rgb: { r: 0, g: 0, b: 0 } };
}

// https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors/9733420#9733420
function getColorLuminance(color: string) {
  const { r, g, b } = getColor(color).rgb;
  const a = [r, g, b].map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getRatio(color1: string, color2: string) {
  const luminance1 = getColorLuminance(color1);
  const luminance2 = getColorLuminance(color2);

  if (!luminance1 || !luminance2) {
    return undefined;
  }

  const ratio =
    luminance1 > luminance2
      ? (luminance2 + 0.05) / (luminance1 + 0.05)
      : (luminance1 + 0.05) / (luminance2 + 0.05);

  return Math.floor((1 / ratio) * 100) / 100;
}

export const ColorContrast = ({ ratio, style }: { ratio: number; style?: React.CSSProperties }) => (
  <div className={styles.contrast}>
    <div className={styles.contrast_preview} style={style}>
      Aa
    </div>
    <div>Contrast: {ratio}:1</div>
    <Flex gap="xs">
      <Tag
        variant="solid"
        title="AA"
        scheme={ratio < 4.5 ? 'red' : 'green'}
        icon={<Icon name={ratio < 4.5 ? 'cross-circle' : 'checkmark-circle'} />}
      />
      <Tag
        variant="solid"
        title="AAA"
        scheme={ratio < 7 ? 'red' : 'green'}
        icon={<Icon name={ratio < 7 ? 'cross-circle' : 'checkmark-circle'} />}
      />
    </Flex>
  </div>
);

export const Palette = () => {
  const [color, setColor] = useState('var(--color-gray-500)');

  const bgColor = 'var(--color-bg)';
  const fgColor = 'var(--color-fg)';
  const bgRatio = getRatio(color, bgColor);
  const fgRatio = getRatio(color, fgColor);
  const luminance = getColorLuminance(color);
  const textColor = luminance && luminance < 0.45 ? 'white' : 'black';

  return (
    <Flex gap="xl" align="flex-start">
      <dl className={styles.palette}>
        <dt />
        {tints.map((tint) => (
          <dt key={tint}>{tint}</dt>
        ))}
        {colors.map((color) => (
          <React.Fragment key={color}>
            <dt>{color}</dt>
            {tints.map((tint) => (
              <dd
                key={`${color}-${tint}`}
                style={{ backgroundColor: palette[color][tint] }}
                onClick={() => setColor(palette[color][tint])}
              />
            ))}
          </React.Fragment>
        ))}
      </dl>
      <Flex direction="column">
        <Heading as="h5" margin={0} title={color} />
        <div className={styles.color} style={{ backgroundColor: color, color: textColor }}>
          {getColor(color).hex}
        </div>
        {bgRatio && (
          <ColorContrast
            ratio={bgRatio}
            style={{ backgroundColor: bgColor, borderColor: color, color: color }}
          />
        )}
        {fgRatio && (
          <ColorContrast
            ratio={fgRatio}
            style={{ backgroundColor: color, borderColor: color, color: fgColor }}
          />
        )}
      </Flex>
    </Flex>
  );
};
