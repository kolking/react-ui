import { Flex, palette, Switch } from '@lib';

export const Switches = () => (
  <Flex direction="column" gap="xl">
    <Flex gap="lg" wrap="wrap">
      <Switch size="xs" />
      <Switch size="sm" />
      <Switch size="md" />
      <Switch size="lg" />
      <Switch size="xl" />
      <Switch defaultChecked checkedColor={palette.green[500]} />
      <Switch defaultChecked checkedColor={palette.cyan[500]} />
      <Switch defaultChecked checkedColor={palette.orange[500]} />
    </Flex>
    <Flex gap="lg" wrap="wrap">
      <Switch label="Switch label" defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Invalid" error="This field is not valid" />
    </Flex>
  </Flex>
);
