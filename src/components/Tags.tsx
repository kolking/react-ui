import { Flex, Icon, palette, PaletteColor, Tag, Tooltip } from '@lib';

const colors = Object.keys(palette) as PaletteColor[];

export const Tags = () => (
  <Flex gap="lg" direction="column">
    <Flex wrap="wrap">
      {colors.map((color) => (
        <Tag key={color} scheme={color} variant="plain">
          {color}
        </Tag>
      ))}
    </Flex>
    <Flex wrap="wrap">
      {colors.map((color) => (
        <Tag key={color} scheme={color}>
          {color}
        </Tag>
      ))}
    </Flex>
    <Flex wrap="wrap">
      {colors.map((color) => (
        <Tag key={color} scheme={color} variant="solid">
          {color}
        </Tag>
      ))}
    </Flex>
    <Flex wrap="wrap">
      <Tag title="Pending" scheme="blue" icon={<Icon name="clock-circle" />} />
      <Tag title="Completed" scheme="green" icon={<Icon name="checkmark-circle" />} />
      <Tag title="Rejected" scheme="red" icon={<Icon name="cross-circle" />} />
      <Tag title="Pending" scheme="blue" variant="solid" icon={<Icon name="clock-circle" />} />
      <Tag
        title="Completed"
        scheme="green"
        variant="solid"
        icon={<Icon name="checkmark-circle" />}
      />
      <Tag title="Rejected" scheme="red" variant="solid" icon={<Icon name="cross-circle" />} />
    </Flex>
    <Flex wrap="wrap">
      <Tag
        as="b"
        title="Bold text"
        scheme="green"
        variant="plain"
        icon={<Icon name="checkmark-circle" />}
      />
      <Tooltip content="Some additional info">
        <Tag scheme="red" variant="plain" icon={<Icon name="error-circle" />}>
          Hover me
        </Tag>
      </Tooltip>
      <Tag
        as="a"
        href="http://example.com"
        title="Link tag"
        scheme="blue"
        variant="plain"
        iconPosition="end"
        icon={<Icon name="arrow-right-circle" />}
      />
    </Flex>
    <Flex wrap="wrap">
      <Tag size="xs" title="Size XS" variant="solid" />
      <Tag size="sm" title="Size SM" variant="solid" />
      <Tag size="md" title="Size MD" variant="solid" />
      <Tag size="lg" title="Size LG" variant="solid" />
      <Tag size="xl" title="Size XL" variant="solid" />
    </Flex>
  </Flex>
);
