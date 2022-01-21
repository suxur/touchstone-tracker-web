import * as React from 'react';
import { PropsWithChildren } from 'react';
import { JetButton, JetButtonProps } from './Button';

type Props = Omit<JetButtonProps, 'bg'>

export const JetDangerButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <JetButton {...props} bg="danger">{children}</JetButton>
);
