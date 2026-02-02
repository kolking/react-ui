import { render, screen, fireEvent } from '@testing-library/react';
import { UseInteractionsReturn } from '@floating-ui/react';

import { MenuItem } from './MenuItem';
import { MenuContext } from './MenuContext';
import styles from './styles.module.scss';

vi.mock('@floating-ui/react', async () => {
  const actual = await vi.importActual('@floating-ui/react');
  return {
    ...actual,
    useListItem: () => ({ ref: vi.fn(), index: 1 }),
  };
});

describe('MenuItem', () => {
  const getItemPropsMock: UseInteractionsReturn['getItemProps'] = (p) => ({ ...p });

  const context = {
    active: null,
    setOpen: vi.fn(),
    getItemProps: getItemPropsMock,
  };

  it('renders as a button by default with role and classes', () => {
    render(
      <MenuContext.Provider value={context}>
        <MenuItem title="Action" />
      </MenuContext.Provider>,
    );

    const root = screen.getByRole('menuitem');
    expect(root.tagName).toBe('BUTTON');
    expect(root.classList.contains(styles.menuitem)).toBe(true);
    expect(root.classList.contains(styles.default)).toBe(true);
  });

  it('renders as given element type and forwards props', () => {
    render(
      <MenuContext.Provider value={context}>
        <MenuItem as="a" href="/" title="Link" />
      </MenuContext.Provider>,
    );

    const root = screen.getByRole('menuitem');
    expect(root.tagName).toBe('A');
    expect(root).toHaveAttribute('href', '/');
    expect(root).not.toHaveAttribute('type');
  });

  it('renders icon blank and title when provided', () => {
    render(
      <MenuContext.Provider value={context}>
        <MenuItem icon="blank" title="Title" />
      </MenuContext.Provider>,
    );

    const root = screen.getByRole('menuitem');
    expect(root.querySelector('[data-icon-blank]')).toBeInTheDocument();
    expect(root.querySelector('span')).toHaveTextContent('Title');
  });

  it('wraps text children with span when children is string', () => {
    render(
      <MenuContext.Provider value={context}>
        <MenuItem>Child</MenuItem>
      </MenuContext.Provider>,
    );

    const root = screen.getByRole('menuitem');
    const span = root.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toContain('Child');
  });

  it('handles click: setOpen(false), onSelect(index) and user onClick', () => {
    const setOpen = vi.fn();
    const onSelect = vi.fn();
    const userOnClick = vi.fn();

    render(
      <MenuContext.Provider value={{ ...context, setOpen, onSelect }}>
        <MenuItem title="Click me" onClick={userOnClick} />
      </MenuContext.Provider>,
    );

    const root = screen.getByRole('menuitem');
    fireEvent.click(root);

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(onSelect).toHaveBeenCalledWith(1); // useListItem mock returns index 1
    expect(userOnClick).toHaveBeenCalled();
  });

  it('sets tabIndex to 0 when active matches index and data-active reflects selected prop', () => {
    const setOpen = vi.fn();
    const onSelect = vi.fn();

    render(
      <MenuContext.Provider value={{ ...context, active: 1, setOpen, onSelect }}>
        <MenuItem title="Active" selected={true} />
      </MenuContext.Provider>,
    );

    const root = screen.getByRole('menuitem');
    expect(root).toHaveAttribute('tabindex', '0');
    expect(root.getAttribute('data-active')).toBe('true');
    expect(root.getAttribute('data-selected')).toBe('true');
  });
});
