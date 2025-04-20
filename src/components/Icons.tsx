import { Flex, Icon, Tooltip } from '@lib';
import icons from '../../lib/components/Icon/icons';
import SvgIcon from '../assets/react.svg?react';

export const Icons = () => (
  <Flex direction="column" gap="2xl">
    <Flex wrap="wrap" gap="xl">
      <Flex>
        <Icon name="help-circle" size={40} scheme="neutral" />
        <span>Neutral</span>
      </Flex>
      <Flex>
        <Icon name="info-circle" size={40} scheme="info" />
        <span>Info</span>
      </Flex>
      <Flex>
        <Icon name="error-circle" size={40} scheme="error" />
        <span>Error</span>
      </Flex>
      <Flex>
        <Icon name="checkmark-circle" size={40} scheme="success" />
        <span>Success</span>
      </Flex>
      <Flex>
        <Icon name="warning" size={40} scheme="warning" />
        <span>Warning</span>
      </Flex>
    </Flex>
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
  </Flex>
);
