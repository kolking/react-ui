import { Button, Icon, Notice } from '@lib';

export const Notices = () => (
  <>
    <Notice scheme="info">Some info message</Notice>
    <Notice scheme="warning">Some warning message</Notice>
    <Notice scheme="error">Some error message</Notice>
    <Notice scheme="success">Some success message</Notice>
    <Notice
      layout="vertical"
      icon={<Icon name="bug" size={40} color="var(--color-accent-500)" />}
      accessory={<Button variant="tertiary" title="Confirm" />}
    >
      <p>
        <em>
          Hello! This is a test message, please keep calm and do nothing, everything is under
          control by the authorities.
        </em>
      </p>
    </Notice>
  </>
);
