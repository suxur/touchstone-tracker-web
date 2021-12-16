import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { JetInput } from '../Jetstream';

export const AuthInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <JetInput {...props} className={clsx('mt-1 block w-full')} />
);
