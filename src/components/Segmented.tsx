import { useCallback, useState } from 'react';
import { Button, ButtonProps, Heading, Icon, Menu, MenuItem, Segmented } from '@lib';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const items = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: 5, label: 'Fifth' },
];

const triggerProps: ButtonProps = {
  type: 'button',
  variant: 'tertiary',
  icon: <Icon name="dropdown" />,
  iconPosition: 'end',
};

export const SegmentedDemo = () => {
  const [size, setSize] = useState<(typeof sizes)[number]>();

  const handleSelect = useCallback((value: number) => {
    console.log('Segmented:', value);
  }, []);

  return (
    <>
      <Heading title="Segmented">
        <Menu trigger={<Button {...triggerProps} title="Size" />}>
          {sizes.map((value, index) => (
            <MenuItem key={index} title={`Size: ${value}`} onClick={() => setSize(value)} />
          ))}
        </Menu>
      </Heading>
      <Segmented items={items} size={size} onSelect={handleSelect}>
        <Button type="button" variant="tertiary" icon={<Icon name="chevron-left" />} />
        <Button type="button" variant="tertiary" icon={<Icon name="chevron-right" />} />
      </Segmented>
    </>
  );
};
