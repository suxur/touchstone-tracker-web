import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../Button';

export type JetDangerButtonProps = Omit<ButtonProps, 'bg'>

export const JetDangerButton = ({ children, ...props }: PropsWithChildren<JetDangerButtonProps>) => (
  <Button {...props} bg="danger">{children}</Button>
);
