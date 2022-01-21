import * as React from 'react';
import { PropsWithChildren } from 'react';
import { JetButton } from './Button';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const JetSecondaryButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <JetButton {...props} bg="secondary">{children}</JetButton>
);
