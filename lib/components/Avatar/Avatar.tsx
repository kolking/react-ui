import cn from 'classnames';
import React, { useMemo, useState } from 'react';

import { cssProps } from '../../utils/helpers';
import { getGravatarUri, getInitials, getStringColor } from './helpers';
import SvgAvatar from './avatar.svg?react';
import styles from './styles.module.scss';

type AvatarImageProps = {
  alt: string;
  src?: string;
  fallback: React.ReactNode;
};

const AvatarImage = ({ src, alt, fallback }: AvatarImageProps) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return fallback;
  }

  return (
    <img
      src={src}
      alt={alt}
      data-avatar-image
      className={styles.image}
      onError={() => setFailed(true)}
    />
  );
};

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number;
  name?: string;
  email?: string;
  src?: string;
  colorize?: boolean;
};

export const Avatar = ({
  size = 50,
  name,
  email,
  src,
  colorize,
  className,
  style,
  children,
  ...props
}: AvatarProps) => {
  const userName = name?.trim();
  const color = colorize && userName ? getStringColor(userName) : undefined;

  const avatarUri = useMemo(() => {
    return src || (email ? getGravatarUri(size, email) : undefined);
  }, [src, size, email]);

  return (
    <figure
      {...props}
      data-avatar
      className={cn(styles.avatar, className)}
      style={{ ...style, ...cssProps({ size, backgroundColor: color }) }}
    >
      <AvatarImage
        key={avatarUri}
        src={avatarUri}
        alt={userName ?? ''}
        fallback={
          userName ? (
            <figcaption data-avatar-initials className={styles.initials}>
              {getInitials(userName)}
            </figcaption>
          ) : (
            <SvgAvatar aria-hidden data-avatar-default className={styles.default} />
          )
        }
      />
      {children}
    </figure>
  );
};
