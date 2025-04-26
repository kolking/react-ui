import { Flex, Icon, IconProps, palette, Tooltip } from '@lib';
import icons from '../../lib/components/Icon/icons';
import SvgIcon from '../assets/react.svg?react';

const schemes: {
  name: IconProps['scheme'];
  icon: IconProps['name'];
}[] = [
  {
    name: 'neutral',
    icon: 'help-circle',
  },
  {
    name: 'info',
    icon: 'info-circle',
  },
  {
    name: 'error',
    icon: 'error-circle',
  },
  {
    name: 'success',
    icon: 'checkmark-circle',
  },
  {
    name: 'warning',
    icon: 'warning',
  },
];

export const Icons = () => (
  <Flex direction="column" gap="2xl">
    <Flex wrap="wrap" gap="lg">
      {schemes.map(({ name, icon }) => (
        <Flex key={name} gap="xs">
          <Icon name={icon} size={30} scheme={name} />
          <span>{name}</span>
        </Flex>
      ))}
    </Flex>
    <Flex wrap="wrap" gap="xl">
      {icons.map((icon, index) => (
        <Tooltip key={index} content={icon}>
          <Icon name={icon} size={40} color={palette.gray[600]} />
        </Tooltip>
      ))}
      <Tooltip content="This is a custom SVG icon with a very long text added to the tooltip content">
        <Icon svg={SvgIcon} size={40} />
      </Tooltip>
    </Flex>
  </Flex>
);
