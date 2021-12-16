import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const JetDangerButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <button
    {...props}
    className={clsx(
      'inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25 transition',
      props.className,
    )}
  >
    {children}
  </button>
);
