import { useState } from 'react';
import { Button, ButtonProps, Heading, Icon, Menu, MenuItem, Segmented } from '@lib';

const items = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const triggerProps: ButtonProps = {
  type: 'button',
  variant: 'tertiary',
  icon: <Icon name="dropdown" />,
  iconPosition: 'end',
};

export const SegmentedDemo = () => {
  const [selected, setSelected] = useState(0);
  const [size, setSize] = useState<(typeof sizes)[number]>();

  return (
    <>
      <Heading title="Segmented">
        <Menu trigger={<Button {...triggerProps} title="Size" />}>
          {sizes.map((value, index) => (
            <MenuItem key={index} title={`Size: ${value}`} onClick={() => setSize(value)} />
          ))}
        </Menu>
      </Heading>
      <Segmented items={items} selected={selected} size={size} onSelect={setSelected} />
    </>
  );
};
