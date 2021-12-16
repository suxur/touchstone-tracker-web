import * as React from 'react';
import clsx from 'clsx';
import { IconButton, IconButtonProps } from './IconButton';

export const DeleteButton = (props: IconButtonProps) => (
  <IconButton
    {...props}
    icon="trash-alt"
    className={clsx(
      'hover:bg-red-100 hover:text-red-400',
      props.className
    )}
  />
);

