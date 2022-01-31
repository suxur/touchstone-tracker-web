import * as React from 'react';
import clsx from 'clsx';

import { IconButton, IconButtonProps } from '@/Components/Button/IconButton';

export const ViewButton = ({ className, ...props }: IconButtonProps) => (
  <IconButton
    {...props}
    icon="eye"
    className={clsx(
      'hover:bg-purple-200 hover:text-purple-500',
      className,
    )}
  />
);
