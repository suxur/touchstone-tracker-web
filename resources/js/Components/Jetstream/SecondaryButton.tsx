import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const JetSecondaryButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <button
    {...props}
    className={clsx(
      'inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition',
      props.className,
    )}
  >
    {children}
  </button>
);
