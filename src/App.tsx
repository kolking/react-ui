import { Button, Flex, Heading, Icon, palette, Spinner } from '@lib';

import { Palette } from './components/Palette';
import { Form } from './components/Form';
import { Buttons } from './components/Buttons';
import { Progress } from './components/Progress';
import { Dialogs } from './components/Dialogs';
import { DropMenu } from './components/DropMenu';
import { Icons } from './components/Icons';
import { Notices } from './components/Notices';
import { SegmentedList } from './components/Segmented';
import { Badges } from './components/Badges';
import { Avatars } from './components/Avatars';
import { Tags } from './components/Tags';
import { Switches } from './components/Switches';

function App() {
  return (
    <main>
      <Palette />
      <Heading title="Form components" size="h1">
        <Button variant="tertiary" title="Action" />
        <Button
          variant="tertiary"
          title="See more"
          icon={<Icon name="disclosure" />}
          iconPosition="end"
        />
      </Heading>
      <Form />
      <Heading title="Switch" />
      <Switches />
      <Heading title="Spinners" />
      <Flex gap="3xl">
        <Spinner />
        <Spinner size={30} color={palette.red[500]} />
        <Spinner size={40} color={palette.purple[500]} />
        <Spinner size={50} color={palette.teal[500]} />
        <Spinner size="3.5em" color={palette.green[500]} />
      </Flex>
      <Heading title="Buttons" />
      <Buttons />
      <Heading title="Progress" />
      <Progress />
      <Heading title="Dialog" />
      <Dialogs />
      <Heading title="Drop Menu" />
      <DropMenu />
      <Heading title="Badges" />
      <Badges />
      <Heading title="Tags" />
      <Tags />
      <Heading title="Avatars" />
      <Avatars />
      <Heading title="Icons" />
      <Icons />
      <Heading title="Notice" />
      <Notices />
      <Heading title="Segmented" />
      <SegmentedList />
    </main>
  );
}

export default App;
