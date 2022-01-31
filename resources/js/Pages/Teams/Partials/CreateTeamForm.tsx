import * as React from 'react';
import { JetActionMessage, JetButton, JetFormSection, JetInput, JetLabel } from '@/Components/Jetstream';
import { useForm } from '@inertiajs/inertia-react';
import { User } from '@/types';
import { JetInputError } from '@/Components/Jetstream/InputError';
import clsx from 'clsx';
import useRoute from '@/Hooks/useRoute';

type Props = {
  user: User;
};

export const CreateTeamForm = ({ user }: Props) => {
  const route = useRoute();
  const form = useForm({
    name: '',
  });

  const createTeam = () => {
    form.post(route('teams.store'), {
      errorBag: 'createTeam',
      preserveScroll: true,
    });
  };

  return (
    <JetFormSection
      title="Team Details"
      description="Create a new team to collaborate with others on projects."
      onSubmit={createTeam}
      renderActions={() => (
        <>
          <JetButton
            className={clsx({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Create
          </JetButton>
          <JetActionMessage on={form.recentlySuccessful} className="ml-3">
            Created.
          </JetActionMessage>
        </>
      )}
    >
      <div className="col-span-6 sm:col-span-4">
        <JetLabel value="Team Owner" />
        <div className="flex items-center mt-2">
          <img className="w-12 h-12 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
          <div className="ml-4 leading-tight">
            <div>{user.name}</div>
            <div className="text-gray-700 text-sm">{user.email}</div>
          </div>
        </div>
      </div>
      <div className="col-span-6 sm:col-span-4">
        <JetLabel htmlFor="name" value="Team Name" />
        <JetInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
        />
        <JetInputError message={form.errors.name} className="mt-2" />
      </div>
    </JetFormSection>
  );
};
