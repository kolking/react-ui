import { Button, Flex, Icon, ProgressBar, ProgressCircular } from '@lib';

export const Progress = () => (
  <Flex direction="column">
    <ProgressBar value={null} maxWidth={500} />
    <ProgressBar value={35} maxWidth={500} color="var(--color-green-500)" />
    <ProgressBar height={10} value={65} maxWidth={500} color="var(--color-purple-500)" />
    <ProgressBar
      height={14}
      value={50}
      maxWidth={500}
      color="var(--color-red-500)"
      trackColor="var(--color-gray-200)"
    />
    <Flex gap="3xl">
      <ProgressCircular value={null} />
      <ProgressCircular value={35} color="var(--color-green-500)" />
      <ProgressCircular size={50} thickness={25} value={35} color="var(--color-purple-500)" />
      <ProgressCircular value={35} color="var(--color-red-500)" linecap="round">
        35%
      </ProgressCircular>
      <ProgressCircular value={65} linecap="round" size={64} thickness={4}>
        <Button variant="tertiary" icon={<Icon name="playback-stop" />} />
      </ProgressCircular>
      <ProgressCircular countdown min={0} max={5} value={3} size="4em" thickness={3}>
        3/5
      </ProgressCircular>
    </Flex>
  </Flex>
);
