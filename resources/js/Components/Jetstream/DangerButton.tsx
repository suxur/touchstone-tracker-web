import * as React from 'react';
import { PropsWithChildren } from 'react';
import { JetButton, JetButtonProps } from './Button';

export type JetDangerButtonProps = Omit<JetButtonProps, 'bg'>

export const JetDangerButton = ({ children, ...props }: PropsWithChildren<JetDangerButtonProps>) => (
  <JetButton {...props} bg="danger">{children}</JetButton>
);
