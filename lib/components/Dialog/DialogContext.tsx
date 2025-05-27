import React from 'react';

export type DialogContextProps = {
  labelId?: string;
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  requestClose: () => void;
};

export const DialogContext = React.createContext<DialogContextProps>({} as DialogContextProps);
