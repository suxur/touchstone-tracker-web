import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  value?: string;
  htmlFor?: string;
  className?: string;
  required?: boolean;
  help?: string;
}

export const JetLabel = ({ value, htmlFor, children, className, required, help }: PropsWithChildren<Props>) => (
  <label className={clsx('flex justify-between font-medium text-sm text-gray-700', className)} htmlFor={htmlFor}>
    <span>
      {value || children}
      {required && (
        <span className="ml-1 text-red-600 text-xs">*</span>
      )}
    </span>
    {help ? (
      <span className="text-gray-600"><small>{help}</small></span>
    ) : null}
  </label>
);
