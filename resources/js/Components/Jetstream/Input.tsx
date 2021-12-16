import * as React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

export const JetInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
    >
  >((props, ref) => (
  <input {...props} ref={ref} className={clsx('input', props.className)}
  />
));
