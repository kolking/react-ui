import React from 'react';
import { render, screen } from '@testing-library/react';

import { Icon } from './Icon';
import styles from './styles.module.scss';

const MockSvg = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} data-testid="root" {...props}>
    <title>mock</title>
  </svg>
));

describe('Icon', () => {
  it('renders nothing when no name or svg is provided', () => {
    const { container } = render(<Icon />);
    expect(container.firstChild).toBeNull();
  });

  it('renders icon by name', () => {
    render(<Icon data-testid="root" name="checkmark" />);

    const icon = screen.getByTestId('root');
    expect(icon.dataset.icon).toBe('checkmark');
  });

  it('renders icon via svg prop', () => {
    render(<Icon svg={MockSvg} />);

    const icon = screen.getByTestId('root');
    expect(icon.dataset.icon).toBeTruthy();
  });

  it('applies size as width and height', () => {
    render(<Icon svg={MockSvg} size={24} />);

    const icon = screen.getByTestId('root');
    expect(icon.style.getPropertyValue('--width')).toBe('24px');
    expect(icon.style.getPropertyValue('--height')).toBe('24px');
  });

  it('applies tuple size correctly', () => {
    render(<Icon svg={MockSvg} size={[16, 32]} />);

    const icon = screen.getByTestId('root');
    expect(icon.style.getPropertyValue('--width')).toBe('16px');
    expect(icon.style.getPropertyValue('--height')).toBe('32px');
  });

  it('applies color via cssProps', () => {
    render(<Icon svg={MockSvg} color="red" />);

    const icon = screen.getByTestId('root');
    expect(icon.style.getPropertyValue('--color')).toBe('red');
  });

  it('applies scheme class', () => {
    render(<Icon svg={MockSvg} scheme="warning" />);

    const icon = screen.getByTestId('root');
    expect([...icon.classList].some((c) => c.includes('warning'))).toBe(true);
  });

  it('sets aria-hidden when aria-label is not provided', () => {
    render(<Icon svg={MockSvg} />);

    const icon = screen.getByTestId('root');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('does not set aria-hidden when aria-label is provided', () => {
    render(<Icon svg={MockSvg} aria-label="icon" />);

    const icon = screen.getByTestId('root');
    expect(icon.getAttribute('aria-hidden')).toBeNull();
  });

  it('applies custom className', () => {
    render(<Icon svg={MockSvg} scheme="success" className="custom-class" />);

    const root = screen.getByTestId('root');
    expect(root.classList.contains(styles.icon)).toBe(true);
    expect(root.classList.contains(styles.success)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
