import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import clsx from 'clsx';
import { ActionMessage } from '@/Components/ActionMessage';
import { Button } from '@/Components/Button';
import { JetFormSection } from '@/Components/Jetstream/FormSection';
import { JetInput } from '@/Components/Jetstream/Input';
import { JetInputError } from '@/Components/Jetstream/InputError';
import { JetLabel } from '@/Components/Jetstream/Label';
import { JetstreamTeamPermissions, Team } from '@/types';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  team: Team;
  permissions: JetstreamTeamPermissions;
}

export const UpdateTeamNameForm = ({ team, permissions }: Props) => {
  const route = useRoute();
  const form = useForm({
    _method: 'PUT',
    name: team.name,
  });

  const updateTeamName = () => {
    form.post(route('teams.update', { team }), {
      errorBag: 'updateTeamName',
      preserveScroll: true,
    });
  };

  return (
    <JetFormSection
      onSubmit={updateTeamName}
      title="Team Name"
      description={'The team\'s name and owner information.'}
      renderActions={() => (permissions.canUpdateTeam ? (
        <>
          <Button
            className={clsx({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </Button>
          <ActionMessage on={form.recentlySuccessful} className="ml-3">
            Saved.
          </ActionMessage>
        </>
      ) : <div />)}
    >
      {/* <!-- Team Owner Information --> */}
      <div className="col-span-6">
        <JetLabel value="Team Owner" />
        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={team.owner.profile_photo_url}
            alt={team.owner.name}
          />

          <div className="ml-4 leading-tight">
            <div>{team.owner.name}</div>
            <div className="text-gray-700 text-sm">{team.owner.email}</div>
          </div>
        </div>
      </div>

      {/* <!-- Team Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <JetLabel htmlFor="name" value="Team Name" />
        <JetInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          disabled={!permissions.canUpdateTeam}
        />
        <JetInputError message={form.errors.name} className="mt-2" />
      </div>
    </JetFormSection>
  );
};
