import { render, screen } from '@testing-library/react';

import { StepperItem } from './StepperItem';
import styles from './styles.module.scss';

describe('StepperItem', () => {
  it('renders a numbered item with a label', () => {
    const { container } = render(<StepperItem index={2}>Delivery</StepperItem>);

    const item = container.querySelector('[data-stepper-item]');
    const index = container.querySelector('[data-stepper-index]');
    const label = container.querySelector('[data-stepper-label]');

    expect(item).toHaveAttribute('data-stepper-item', '2');
    expect(index).toHaveTextContent('3');
    expect(label).toHaveTextContent('Delivery');
  });

  it('uses zero as the default index', () => {
    const { container } = render(<StepperItem>Account</StepperItem>);

    expect(container.querySelector('[data-stepper-item]')).toHaveAttribute(
      'data-stepper-item',
      '0',
    );
    expect(container.querySelector('[data-stepper-index]')).toHaveTextContent('1');
  });

  it('exposes active and completed states as data attributes', () => {
    render(
      <StepperItem data-testid="item" active completed>
        Confirmation
      </StepperItem>,
    );

    const item = screen.getByTestId('item');
    expect(item).toHaveAttribute('data-stepper-active', 'true');
    expect(item).toHaveAttribute('data-stepper-completed', 'true');
  });

  it('renders a checkmark icon for a completed item', () => {
    const { container } = render(<StepperItem completed>Payment</StepperItem>);

    const index = container.querySelector('[data-stepper-index]') as HTMLElement;
    expect(index.querySelector('[data-icon]')).toHaveAttribute('data-icon', 'checkmark');
    expect(index).not.toHaveTextContent('1');
  });

  it('renders a custom icon instead of the number or completed icon', () => {
    const { container } = render(
      <StepperItem completed icon={<svg aria-label="Custom step icon" />}>
        Payment
      </StepperItem>,
    );

    const index = container.querySelector('[data-stepper-index]') as HTMLElement;
    expect(screen.getByLabelText('Custom step icon')).toBeInTheDocument();
    expect(index.querySelector('[data-icon]')).not.toBeInTheDocument();
    expect(index).not.toHaveTextContent('1');
  });

  it('supports the polymorphic as prop and forwards native attributes', () => {
    render(
      <StepperItem as="a" href="/delivery" target="_blank">
        Delivery
      </StepperItem>,
    );

    const link = screen.getByRole('link', { name: /delivery/i });
    expect(link).toHaveAttribute('href', '/delivery');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('applies component and custom classes', () => {
    render(
      <StepperItem data-testid="item" className="custom-class">
        Account
      </StepperItem>,
    );

    expect(screen.getByTestId('item')).toHaveClass(styles.step, 'custom-class');
  });
});
