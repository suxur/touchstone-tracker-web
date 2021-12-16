import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  showing: boolean;
}

export const Fade = ({ children, showing }: PropsWithChildren<Props>) => {
  return (
    <Transition
      appear={true}
      show={showing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};
