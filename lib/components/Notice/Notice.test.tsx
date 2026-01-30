import { render, screen } from '@testing-library/react';

import { Notice } from './Notice';
import styles from './styles.module.scss';

describe('Notice', () => {
  it('renders with defaults', () => {
    render(<Notice data-testid="root">Message</Notice>);

    const root = screen.getByTestId('root');
    const icon = screen.getByLabelText('info icon');

    expect(root.textContent).toBe('Message');
    expect(root.dataset.notice).toBe('neutral');
    expect(root.dataset.layout).toBe('horizontal');
    expect(icon.dataset.icon).toBe('info-outline');
  });

  it('renders error state and error icon', () => {
    render(<Notice data-testid="root" error={new Error('Boom')} />);

    const root = screen.getByTestId('root');
    const icon = screen.getByLabelText('error icon');

    expect(root.textContent).toBe('Boom');
    expect(root.dataset.notice).toBe('error');
    expect(icon.dataset.icon).toBe('error-circle');
  });

  it('renders custom icon instead of default', () => {
    render(<Notice icon={<svg aria-label="custom icon" />}>Message</Notice>);
    expect(screen.getByLabelText('custom icon')).toBeInTheDocument();
  });

  it('renders without icon when icon is null', () => {
    const { container } = render(<Notice icon={null}>Message</Notice>);
    expect(container.querySelector('[data-icon]')).not.toBeInTheDocument();
  });

  it('renders vertically with an accessory', () => {
    render(
      <Notice data-testid="root" layout="vertical" accessory={<button />}>
        Message
      </Notice>,
    );

    const root = screen.getByTestId('root');
    expect(root.dataset.layout).toBe('vertical');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Notice data-testid="root" scheme="success" className="custom-class" />);

    const root = screen.getByTestId('root');
    expect(root.classList.contains(styles.container)).toBe(true);
    expect(root.classList.contains(styles.success)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
