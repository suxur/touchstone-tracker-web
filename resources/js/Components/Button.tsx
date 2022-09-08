import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement> {
  processing?: boolean;
  bg?: 'primary' | 'primary-inverted' | 'secondary' | 'danger' | 'transparent'
}

export const Button = ({ children, processing, bg = 'primary', ...props }: PropsWithChildren<ButtonProps>) => (
  <button
    {...props}
    className={clsx(
      'justify-center inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest transition ease-in-out duration-150 focus:outline-none disabled:opacity-25',
      { 'bg-purple-600 text-purple-50 border-transparent hover:bg-purple-700 active:bg-purple-800': bg === 'primary' },
      { 'bg-purple-50 text-purple-600 border-purple-600 hover:bg-purple-100 active:bg-purple-200': bg === 'primary-inverted' },
      { 'bg-white text-gray-700 border-gray-300 hover:text-gray-500 active:text-gray-800': bg === 'secondary' },
      { 'bg-red-600 text-red-50 border-transparent hover:bg-red-700 active:bg-red-800': bg === 'danger' },
      { 'bg-transparent text-gray-500 border-transparent hover:bg-gray-200 active:bg-gray-200': bg === 'transparent' },
      { loading: processing },
      props.className,
    )}
    disabled={props.disabled || processing}
  >
    {children}
  </button>
);
