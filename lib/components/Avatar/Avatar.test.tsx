import { render, screen, fireEvent } from '@testing-library/react';

import { Avatar } from './Avatar';

vi.mock('./avatar.svg?react', () => ({
  default: () => <svg data-testid="default-avatar" />,
}));

describe('Avatar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="image.png" />);

    // An <img> with alt="" has the presentation role
    const img = screen.getByRole('presentation');
    expect(img).toHaveAttribute('src', 'image.png');
    expect(img).toHaveAttribute('alt', '');
  });

  it('renders image with correct alt attribute', () => {
    render(<Avatar src="image.png" name="John Doe" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'John Doe');
  });

  it('renders gravatar when email is provided and no src', () => {
    render(<Avatar email="test@mail.com" name="John Doe" />);
    expect(screen.getByRole('img').getAttribute('src')).toContain(
      'https://www.gravatar.com/avatar/',
    );
  });

  it('falls back to initials when image fails to load', () => {
    render(<Avatar name="John Doe" email="test@mail.com" />);

    fireEvent.error(screen.getByRole('img'));

    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders initials when name is provided but no image', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders default avatar when no name, email or src is provided', () => {
    render(<Avatar name="" />);
    expect(screen.getByTestId('default-avatar')).toBeInTheDocument();
  });

  it('applies background color when colorize is enabled', () => {
    render(<Avatar name="John Doe" colorize={true} />);
    expect(screen.getByRole('figure').getAttribute('style')).toBe(
      `--size: 50px; --background-color: hsl(213, 75%, 50%);`,
    );
  });

  it('applies custom size variable', () => {
    render(<Avatar size={35} />);
    expect(screen.getByRole('figure').getAttribute('style')).toBe(`--size: 35px;`);
  });

  it('renders children', () => {
    render(
      <Avatar>
        <span data-testid="child">child</span>
      </Avatar>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
