import { Flex, Icon, Tooltip } from '@lib';
import icons from '../../lib/components/Icon/icons';
import SvgIcon from '../assets/react.svg?react';

export const Icons = () => (
  <Flex wrap="wrap" gap="xl">
    {icons.map((icon, index) => (
      <Tooltip key={index} content={icon}>
        <Icon name={icon} size={40} color="var(--color-gray-600)" />
      </Tooltip>
    ))}
    <Tooltip content="This is a custom SVG icon with a very long text added to the tooltip content">
      <Icon svg={SvgIcon} size={40} />
    </Tooltip>
  </Flex>
);
