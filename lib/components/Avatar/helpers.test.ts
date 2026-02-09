import { md5 } from 'js-md5';

import { getGravatarUri, getInitials, getStringColor } from './helpers';

vi.mock('js-md5', () => ({
  md5: vi.fn(),
}));

describe('getGravatarUri', () => {
  const mockedMd5 = vi.mocked(md5);

  beforeEach(() => {
    mockedMd5.mockReturnValue('mocked-hash');
  });

  it.each([
    {
      size: 40,
      dpr: undefined,
      email: 'User@Email.com',
      expectedSize: 40,
    },
    {
      size: 40,
      dpr: 2,
      email: '  USER@email.com ',
      expectedSize: 80,
    },
    {
      size: 25,
      dpr: 1.5,
      email: 'test@test.com',
      expectedSize: 38,
    },
  ])('returns correct gravatar uri for %#', ({ size, dpr, email, expectedSize }) => {
    Object.defineProperty(window, 'devicePixelRatio', {
      value: dpr,
      configurable: true,
    });

    const result = getGravatarUri(size, email);

    expect(mockedMd5).toHaveBeenCalledWith(email.trim().toLowerCase());
    expect(result).toBe(`https://www.gravatar.com/avatar/mocked-hash?s=${expectedSize}&d=404`);
  });
});

describe('getInitials', () => {
  it('returns initials for first and last name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('returns only first letter if one word is provided', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('ignores extra spaces between words', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD');
  });

  it('uses first and last word when more than two words are provided', () => {
    expect(getInitials('John Ronald Reuel Tolkien')).toBe('JT');
  });

  it('works with non-latin characters', () => {
    expect(getInitials('Иван Иванович')).toBe('ИИ');
  });

  it('returns empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });

  it('handles strings with only spaces', () => {
    expect(getInitials('   ')).toBe('');
  });
});

describe('getStringColor', () => {
  it('returns the same color for the same string', () => {
    const color1 = getStringColor('hello');
    const color2 = getStringColor('hello');

    expect(color1).toBe(color2);
  });

  it('returns different colors for different strings', () => {
    const color1 = getStringColor('hello');
    const color2 = getStringColor('world');

    expect(color1).not.toBe(color2);
  });

  it('returns a valid hsl color string', () => {
    const color = getStringColor('test');

    expect(color).toMatch(/^hsl\(-?\d+, 75%, 50%\)$/);
  });

  it('handles empty string', () => {
    expect(getStringColor('')).toBe('hsl(0, 75%, 50%)');
  });

  it('is case-sensitive', () => {
    const lower = getStringColor('test');
    const upper = getStringColor('Test');

    expect(lower).not.toBe(upper);
  });
});
