import * as React from 'react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export const JetCheckbox = ({ className, disabled, ...props } : DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
  <input
    type="checkbox"
    {...props}
    disabled={disabled}
    className={clsx(
      'rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      className,
    )}
  />
);
