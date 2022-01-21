import * as React from 'react';
import clsx from 'clsx';

import { VoidFn } from '@/types';
import { useUpdateEncounter } from '@/Hooks/useUpdateEncounter';

interface Props {
  onSuccess: VoidFn;
}

export const EndButton = ({ onSuccess }: Props) => {
  const { update, processing } = useUpdateEncounter({ onSuccess });

  const onClick = () => {
    update('is_active', false);
  };

  return (
    <button
      className={clsx("button bg-red-600 hover:bg-red-700 mr-2", { 'loading': processing })}
      onClick={onClick}
    >
      End
    </button>);
};