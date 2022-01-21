import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import clsx from 'clsx';

import { VoidFn } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { useEncounter } from '@/Hooks/useEncounter';

interface Props {
  onSuccess: VoidFn;
}

export const EndAndClearButton = ({ onSuccess }: Props) => {
  const { encounter } = useEncounter();

  const route = useRoute();
  const form = useForm({
    encounter: {
      ...encounter,
      is_active: false,
      combatants: [],
    },
  });

  const onClick = () => {
    form.post(route('encounters.update', { encounter }), {
      only: ['encounter'],
      onSuccess: () => onSuccess()
    });
  };

  return (
    <button
      className={clsx("button bg-red-600 hover:bg-red-700", { 'loading': form.processing })}
      onClick={onClick}
    >
      End &amp; Clear
    </button>);
};