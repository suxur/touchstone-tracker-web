import * as React from 'react';
import { HTMLProps } from 'react';
import clsx from 'clsx';

export const InputError = ({ children, className, ...props }: HTMLProps<HTMLSpanElement>) => (
  <span className={clsx('mt-1 ml-1 text-sm text-red-600', className)} {...props}>
    {children}
  </span>
);
