import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  showing: boolean;
}

export const Fade = ({ children, showing }: PropsWithChildren<Props>) => (
  <Transition
    appear
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
