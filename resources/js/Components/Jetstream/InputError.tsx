import * as React from 'react';
import { PropsWithChildren } from 'react';

interface Props {
  message?: string;
  className?: string;
}

export const JetInputError = ({ message, className, children }: PropsWithChildren<Props>) => {
  if (!message && !children) {
    return null;
  }
  return (
    <div className={className}>
      <p className="text-sm text-red-600">{message || children}</p>
    </div>
  );
};
