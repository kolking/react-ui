import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Breadcrumbs, Button, ButtonProps, Heading, Icon, Menu, MenuItem } from '@lib';

const items: (Breadcrumb | Breadcrumb<typeof Link>)[] = [
  { label: 'Home', href: '/' },
  { label: 'Men’s Shoes', as: Link, to: '/shoes' },
  { label: 'Skateboarding', href: '/shoes/skateboarding' },
  { label: 'Nike SB Dunk Low Pro' },
];

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const triggerProps: ButtonProps = {
  type: 'button',
  variant: 'tertiary',
  icon: <Icon name="dropdown" />,
  iconPosition: 'end',
};

export const BreadcrumbsDemo = () => {
  const [size, setSize] = useState<(typeof sizes)[number]>();

  return (
    <>
      <Heading title="Breadcrumbs">
        <Menu trigger={<Button {...triggerProps} title="Size" />}>
          {sizes.map((value, index) => (
            <MenuItem key={index} title={`Size: ${value}`} onClick={() => setSize(value)} />
          ))}
        </Menu>
      </Heading>
      <Breadcrumbs items={items} size={size} />
    </>
  );
};
