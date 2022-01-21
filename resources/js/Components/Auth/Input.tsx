import * as React from 'react';
import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { JetInput } from '../Jetstream';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const AuthInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    Props,
    HTMLInputElement
    >
  >(({hasError, ...props}: Props, ref) => (
  <JetInput ref={ref} {...props} className={clsx('mt-1 block w-full', {'border-red-300 ring-red-200 focus:border-red-300 focus:ring-red-200': hasError})} />
));
