import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  on: boolean;
  className?: string;
}

export const ActionMessage = ({ on, className, children }: PropsWithChildren<Props>) => (
  <div className={className}>
    <Transition
      show={on}
      leave="transition ease-in duration-1000"
      leave-from-class="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="text-sm text-gray-600">{children}</div>
    </Transition>
  </div>
);
