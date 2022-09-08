import * as React from 'react';
import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

import { Button } from '@/Components/Button';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const JetSecondaryButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <Button {...props} bg="secondary">{children}</Button>
);
