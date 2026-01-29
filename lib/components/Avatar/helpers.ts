import { md5 } from 'js-md5';

export function getGravatarUri(size: number, email: string) {
  const emailHash = md5(email.toLowerCase().trim());
  const dpr = window.devicePixelRatio || 1;
  const pixelSize = Math.round(dpr * size);

  return `https://www.gravatar.com/avatar/${emailHash}?s=${pixelSize}&d=404`;
}

export function getInitials(name: string) {
  // Split the name string into words array
  const words = name.trim().split(/\s+/gu).filter(Boolean);

  if (words.length === 0) {
    return '';
  }

  // First letter of the first word + first letter of the last word (if more than 1 word)
  const initials = [...words[0]][0] + (words.length > 1 ? [...words[words.length - 1]][0] : '');

  return initials.toUpperCase();
}

export function getStringColor(string: string) {
  let hash = 0;

  if (string.length > 0) {
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
    }
  }

  // Avoid negative hue values
  const hue = ((hash % 360) + 360) % 360;

  return `hsl(${hue}, 75%, 50%)`;
}
