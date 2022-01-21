import * as React from 'react';
import { PropsWithChildren } from 'react';
import { JetButton, JetButtonProps } from './Button';

type Props = Omit<JetButtonProps, 'bg'>

export const JetTransparentButton = ({ children, ...props }: PropsWithChildren<Props>) => (
  <JetButton {...props} bg="transparent">{children}</JetButton>
);
