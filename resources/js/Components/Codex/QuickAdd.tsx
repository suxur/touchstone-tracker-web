import * as React from 'react';
import { FormEvent } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StatBlockType } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { useEncounter } from '@/Hooks/useEncounter';
import { JetButton } from '@/Components/Jetstream';

interface Props {
  type: StatBlockType;
}

export const QuickAdd = ({ type }: Props) => {
  const route = useRoute();
  const { encounter } = useEncounter();

  const form = useForm({
    name: '',
    type
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('encounter.add.combatant', { encounter }), {
      only: ['encounter'],
      onSuccess: () => form.reset(),
    });
  };

  return (
    <form className="flex" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Quick Add"
        className="border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 flex-grow rounded-l-md border-r-0"
        name="name"
        value={form.data.name}
        onChange={e => form.setData('name', e.target.value)}
        required
      />
      <JetButton
        type="submit"
        className="rounded-l-none"
        processing={form.processing}
      >
        <FontAwesomeIcon icon="plus" />
      </JetButton>
    </form>
  );
};
