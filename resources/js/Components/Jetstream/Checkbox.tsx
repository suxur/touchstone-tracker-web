import * as React from 'react';
import clsx from 'clsx';

export const JetCheckbox = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
  <input
    type="checkbox"
    {...props}
    className={clsx(
      'rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
      props.className,
    )}
  />
);
