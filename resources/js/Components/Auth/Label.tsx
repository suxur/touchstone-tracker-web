import * as React from 'react';
import { JetLabel } from '../Jetstream';
import { InputError } from '../InputError';

interface Props {
  title: string;
  name: string;
  error?: string;
}

export const AuthLabel = ({ name, title, error }: Props) => (
  <JetLabel htmlFor={name} className="flex justify-between items-center">
    <span className="mr-1">{title}</span>
    {error && <InputError>{error}</InputError>}
  </JetLabel>
);
