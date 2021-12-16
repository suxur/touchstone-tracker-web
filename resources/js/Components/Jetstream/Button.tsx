import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement> {
  processing?: boolean;
}

export const JetButton = ({ children, processing, ...props }: PropsWithChildren<Props>) => (
  <button
    {...props}
    className={clsx(
      'button button-primary',
      { 'loading': processing },
      props.className,
    )}
    disabled={processing}
  >
    {children}
  </button>
);
