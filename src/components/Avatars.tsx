import { useCallback, useState } from 'react';
import { Avatar, Badge, Flex } from '@lib';

const images = [
  'https://example.com/image.png',
  'https://xsgames.co/randomusers/assets/avatars/female/44.jpg',
  'https://xsgames.co/randomusers/assets/avatars/male/42.jpg',
  'https://xsgames.co/randomusers/assets/avatars/female/38.jpg',
  'https://xsgames.co/randomusers/assets/avatars/male/73.jpg',
  'https://xsgames.co/randomusers/assets/avatars/female/2.jpg',
  'https://xsgames.co/randomusers/assets/avatars/male/46.jpg',
];

export const Avatars = () => {
  const [image, setImage] = useState(1);
  const [badge, setBadge] = useState(3);

  const toggleBadge = useCallback(() => {
    setBadge(badge === 5 ? 0 : badge + 1);
  }, [badge]);

  const toggleImage = useCallback(() => {
    setImage(image + 1 === images.length ? 0 : image + 1);
  }, [image]);

  return (
    <Flex wrap="wrap">
      <Avatar style={{ borderRadius: 15 }} />
      <Avatar src={images[0]} />
      <Avatar email="jasonsmith@mailto.plus" onClick={toggleBadge}>
        <Badge value={badge} />
      </Avatar>
      <Avatar email="amandastone@mailto.plus">
        <Badge value={!!badge} placement="bottom-right" scheme="green" />
      </Avatar>
      <Avatar email="lucyfoster@mailto.plus" />
      <Avatar src={images[image]} onClick={toggleImage} />
      <Avatar name="👩" />
      <Avatar name="Nick" />
      <Avatar name="Jason Smith" colorize={true} />
      <Avatar name="Emma Miller" email="nogravatar@email.com" colorize={true} />
    </Flex>
  );
};
