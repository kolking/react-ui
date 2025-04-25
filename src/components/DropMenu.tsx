import { Button, Flex, Icon, Menu, MenuItem, Notice } from '@lib';

export const DropMenu = () => (
  <Flex>
    <Menu trigger={<Button title="Menu" icon={<Icon name="dropdown" />} iconPosition="end" />}>
      <MenuItem title="First action" />
      <MenuItem title="Second action" />
      <MenuItem title="Third action" scheme="negative" />
    </Menu>
    <Menu
      placement="bottom-end"
      trigger={
        <Button
          title="Icons menu"
          variant="secondary"
          icon={<Icon name="dropdown" />}
          iconPosition="end"
        />
      }
    >
      <MenuItem
        title="Undo action"
        icon={<Icon name="undo-circle" />}
        onClick={() => console.log('menu 1')}
      />
      <MenuItem
        title="Redo action"
        icon={<Icon name="redo-circle" />}
        onClick={() => console.log('menu 1')}
      />
      <MenuItem
        title="Disabled"
        disabled={true}
        icon={<Icon name="cross-circle" />}
        onClick={() => console.log('menu 1')}
      />
      <MenuItem
        title="Positive action"
        scheme="positive"
        icon={<Icon name="checkmark-circle" />}
        onClick={() => console.log('menu 2')}
      />
      <hr />
      <MenuItem
        title="Negative action"
        scheme="negative"
        icon={<Icon name="delete" />}
        onClick={() => console.log('menu 3')}
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
