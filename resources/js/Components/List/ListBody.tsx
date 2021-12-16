import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string
}

export const ListBody = ({ className, children }: PropsWithChildren<Props>) => (
  <div className={clsx('bg-white divide-y divide-gray-200 rounded-b-md overflow-auto min-h-0 grid grid-cols-12', className)}>
    {children}
  </div>
);
