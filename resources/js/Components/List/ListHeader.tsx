import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const ListHeader = ({ className, children }: PropsWithChildren<Props>) => (
  <div className={clsx('bg-gray-600 rounded-t-md py-3 text-xs font-medium text-gray-200 uppercase tracking-wider grid grid-cols-12 gap-2', className)}>
    {children}
  </div>
);
