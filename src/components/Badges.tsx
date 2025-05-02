import { useCallback, useState } from 'react';
import { Badge, Button, Flex, Icon, palette, PaletteColor } from '@lib';

const colors = Object.keys(palette) as PaletteColor[];

export const Badges = () => {
  const [badge, setBadge] = useState<number>(0);

  const toggleBadge = useCallback(() => {
    setBadge(badge === 15 ? 0 : badge + 3);
  }, [badge]);

  return (
    <Flex gap="lg" direction="column">
      <Flex wrap="wrap">
        <Badge size="xs" placement={null} value={3} />
        <Badge size="sm" placement={null} value={3} />
        <Badge size="md" placement={null} value={3} />
        <Badge size="lg" placement={null} value={3} />
        <Badge size="xl" placement={null} value={3} />
        {colors.map((color) => (
          <Badge key={color} placement={null} value={35} scheme={color} />
        ))}
      </Flex>
      <Flex>
        <Button variant="secondary" onClick={toggleBadge}>
          <span>Click me</span>
          <Badge value={badge} />
        </Button>
        <Button variant="secondary" onClick={toggleBadge}>
          <span>Click me</span>
          <Badge value={Boolean(badge)} />
        </Button>
        <div style={{ borderRadius: '50%' }}>
          <Icon name="profile" size={50} scheme="neutral" />
          <Badge value={badge} scheme="accent" />
        </div>
        <div style={{ borderRadius: '50%' }}>
          <Icon name="shopping-cart" size={32} scheme="neutral" />
          <Badge size="sm" value={badge} />
        </div>
      </Flex>
    </Flex>
  );
};
