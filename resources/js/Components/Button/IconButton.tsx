import * as React from 'react';
import { HTMLProps } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export interface IconButtonProps extends HTMLProps<HTMLButtonElement> {
  loading?: boolean;
}

type Props = { icon: IconProp; } & IconButtonProps

export const IconButton = ({ onClick, loading, className, icon, ...props }: Props) => (
  <button
    {...props}
    onClick={onClick}
    type="button"
    className={clsx(
      'flex h-10 w-10 justify-center items-center px-4 rounded-md bg-transparent text-gray-400',
      { loading },
      className,
    )}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);
