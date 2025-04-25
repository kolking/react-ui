import { md5 } from 'js-md5';

export function getGravatarUri(size: number, email: string) {
  const emailHash = md5(email.toLowerCase().trim());
  const pixelSize = window.devicePixelRatio * size;
  return `https://www.gravatar.com/avatar/${emailHash}?s=${pixelSize}&d=404`;
}

export function getInitials(name: string) {
  const initials = name.trim().split(/\s+/gu) || [];
  let output = [...(initials.shift() || '')][0];

  if (initials.length > 0) {
    output += [...(initials.pop() || '')][0];
  }

  return output.toUpperCase();
}

export function getStringColor(string: string) {
  let hash = 0;

  if (string.length > 0) {
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
    }
  }

  return `hsl(${hash % 360}, 75%, 50%)`;
}
