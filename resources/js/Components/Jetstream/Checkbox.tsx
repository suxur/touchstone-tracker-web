import * as React from 'react';
import clsx from 'clsx';

export const JetCheckbox = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
  <input
    type="checkbox"
    {...props}
    className={clsx(
      'rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50',
      props.className,
    )}
  />
);
