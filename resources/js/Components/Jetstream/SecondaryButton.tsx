import * as React from 'react';
import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

import { JetButton } from '@/Components/Jetstream/Button';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const JetSecondaryButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <JetButton {...props} bg="secondary">{children}</JetButton>
);
