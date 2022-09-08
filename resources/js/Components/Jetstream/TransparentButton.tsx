import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../Button';

type Props = Omit<ButtonProps, 'bg'>

export const JetTransparentButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <Button {...props} bg="transparent">{children}</Button>
);
