import * as React from 'react';
import { PropsWithChildren } from 'react';

interface Props {
  value?: string;
  htmlFor?: string;
}

export const JetLabel = ({ value, htmlFor, children }: PropsWithChildren<Props>) => (
  <label className="block font-medium text-sm text-gray-700" htmlFor={htmlFor}>
    {value || children}
  </label>
);
