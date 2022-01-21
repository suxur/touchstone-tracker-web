import * as React from 'react';
import { JetLabel } from '../Jetstream';
import { InputError } from '../InputError';

interface Props {
  title: string;
  name: string;
  error?: string;
}

export const AuthLabel = ({ name, title, error }: Props) => {
  return (
    <JetLabel htmlFor={name} className="flex justify-between items-center">
      <span>{title}</span> {error && <InputError>{error}</InputError>}
    </JetLabel>
  );
};
