import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const ListHeader = ({ className, children }: PropsWithChildren<Props>) => (
  <div className={clsx('flex flex-row bg-gray-600 rounded-t-md py-3 text-xs font-medium text-gray-200 uppercase tracking-wider', className)}>
    {children}
  </div>
);
