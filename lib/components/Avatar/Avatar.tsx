import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { cssProps } from '../../utils/helpers';
import { getGravatarUri, getInitials, getStringColor } from './helpers';
import SvgAvatar from './avatar.svg?react';
import styles from './styles.module.scss';

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

  const [imageSource, setImageSource] = useState(avatarUri);

  useEffect(() => {
    setImageSource(avatarUri);
  }, [avatarUri]);

  const handleError = useCallback(() => {
    setImageSource(undefined);
  }, []);

  return (
    <div
      {...props}
      data-avatar
      className={cn(styles.avatar, className)}
      style={{ ...style, ...cssProps({ size, backgroundColor: color }) }}
    >
      {imageSource ? (
        <img
          data-avatar-image
          className={styles.image}
          src={imageSource}
          alt={userName ?? ''}
          onError={handleError}
        />
      ) : userName ? (
        <span data-avatar-initials className={styles.initials}>
          {getInitials(userName)}
        </span>
      ) : (
        <SvgAvatar aria-hidden data-avatar-default className={styles.default} />
      )}
      {children}
    </div>
  );
};
