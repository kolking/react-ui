import { render, screen } from '@testing-library/react';

import { Breadcrumbs } from './Breadcrumbs';
import styles from './styles.module.scss';

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Product' },
  ];

  it('renders ordered list with items', () => {
    render(<Breadcrumbs items={items} />);

    const root = screen.getByRole('list');
    expect(root.querySelectorAll('li')).toHaveLength(3);
  });

  it('renders links and spans correctly', () => {
    render(<Breadcrumbs items={items} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/catalog');
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  it('marks last item with aria-current="page"', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Product')).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators between items', () => {
    render(<Breadcrumbs items={items} separator="→" />);
    expect(screen.getAllByText('→')).toHaveLength(2);
  });

  it('supports polymorphic "as" prop', () => {
    render(<Breadcrumbs items={[{ label: 'Home', as: 'button' }, { label: 'Page' }]} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies size css prop', () => {
    render(<Breadcrumbs items={items} size="lg" />);

    const root = screen.getByRole('list');
    expect(root.style.getPropertyValue('--size')).toBe('var(--size-lg)');
  });

  it('applies custom className', () => {
    render(<Breadcrumbs items={items} className="custom-class" />);

    const root = screen.getByRole('list');
    expect(root.classList.contains(styles.breadcrumbs)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
