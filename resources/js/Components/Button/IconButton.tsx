import * as React from 'react';
import { HTMLProps } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IconButtonProps extends HTMLProps<HTMLButtonElement> {
  loading?: boolean;
}

type Props = { icon: IconProp; } & IconButtonProps

export const IconButton = (props: Props) => {
  return (
    <button
      {...props}
      onClick={props.onClick}
      type="button"
      className={clsx(
        'flex h-10 w-10 justify-center items-center px-4 rounded-md bg-transparent text-gray-400',
        { 'loading': props.loading },
        props.className
      )}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
};
