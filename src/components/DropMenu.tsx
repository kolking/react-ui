import { Button, ButtonProps, Flex, Icon, Menu, MenuItem, Notice } from '@lib';

const triggerProps: ButtonProps = {
  type: 'button',
  icon: <Icon name="dropdown" />,
  iconPosition: 'end',
};

export const DropMenu = () => (
  <Flex>
    <Menu trigger={<Button {...triggerProps} title="Menu" />}>
      <MenuItem title="First action" />
      <MenuItem title="Second action" />
      <MenuItem as="a" title="Link action" href="https://google.com/" target="_blank" />
      <MenuItem title="Third action" scheme="negative" />
    </Menu>
    <Menu
      placement="bottom-end"
      trigger={<Button {...triggerProps} title="Icons menu" variant="secondary" />}
      onSelect={(index) => console.log('Selected item', index)}
    >
      <MenuItem
        title="Undo action"
        icon={<Icon name="undo-circle" />}
        onClick={() => console.log('Menu item 0')}
      />
      <MenuItem
        title="Redo action"
        icon={<Icon name="redo-circle" />}
        onClick={() => console.log('Menu item 1')}
      />
      <MenuItem
        title="Disabled"
        disabled={true}
        icon={<Icon name="cross-circle" />}
        onClick={() => console.log('Menu item 2')}
      />
      <MenuItem
        title="Positive action"
        scheme="positive"
        icon={<Icon name="checkmark-circle" />}
        onClick={() => console.log('Menu item 3')}
      />
      <hr />
      <MenuItem
        title="Negative action"
        scheme="negative"
        icon={<Icon name="delete" />}
        onClick={() => console.log('Menu item 4')}
      />
    </Menu>
    <Menu
      maxWidth="15em"
      trigger={<Button variant="tertiary" title="Custom menu" icon={<Icon name="gear" />} />}
    >
      <Notice margin={0} padding="0.75em" scheme="warning">
        Hey there! This is a custom menu content.
      </Notice>
    </Menu>
  </Flex>
);
