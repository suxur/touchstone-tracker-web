import * as React from 'react';
import clsx from 'clsx';
import { IconButton, IconButtonProps } from './IconButton';

export const ViewButton = (props: IconButtonProps) => (
  <IconButton
    {...props}
    icon="eye"
    className={clsx(
      'hover:bg-purple-200 hover:text-purple-500',
      props.className
    )}
  />
);
