import * as React from 'react';
import { JetLabel } from '../Jetstream';
import { InputError } from '../InputError';

interface Props {
  title: string;
  name: string;
}

export const AuthLabel = ({ name, title }: Props) => {
  return (
    <JetLabel htmlFor={name}>
      {title} <InputError name={name} />
    </JetLabel>
  );
};
