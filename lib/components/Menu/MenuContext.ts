import React from 'react';
import { UseInteractionsReturn } from '@floating-ui/react';

export type MenuContextProps = {
  active: number | null;
  setOpen: (value: boolean) => void;
  getItemProps: UseInteractionsReturn['getItemProps'];
};

export const MenuContext = React.createContext<MenuContextProps>({} as MenuContextProps);
