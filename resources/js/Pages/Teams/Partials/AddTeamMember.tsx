import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import clsx from 'clsx';
import { JetActionMessage } from '@/Components/Jetstream/ActionMessage';
import { JetButton } from '@/Components/Jetstream/Button';
import { JetFormSection } from '@/Components/Jetstream/FormSection';
import { JetInput } from '@/Components/Jetstream/Input';
import { JetInputError } from '@/Components/Jetstream/InputError';
import { JetLabel } from '@/Components/Jetstream/Label';
import { JetstreamTeamPermissions, Role, Team } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { Roles } from '@/Domains/Teams/Components/Roles';

interface Props {
  team: Team;
  availableRoles: Role[];
  permissions: JetstreamTeamPermissions;
}

export const AddTeamMember = ({ team, permissions, availableRoles }: Props) => {
  const route = useRoute();
  const form = useForm({
    email: '',
    role: '',
  });

  const addTeamMember = () => {
    form.post(route('team-members.store', { team }), {
      errorBag: 'addTeamMember',
      preserveScroll: true,
      onSuccess: () => form.reset(),
    });
  };

  return (
    <JetFormSection
      onSubmit={addTeamMember}
      title={'Add Team Member'}
      description={`Add a new team member to your team, allowing them to collaborate with you.`}
      renderActions={() => (
        <>
          {permissions.canUpdateTeam && (
            <>
              <JetButton
                className={clsx({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                Add
              </JetButton>
              <JetActionMessage on={form.recentlySuccessful} className="ml-3">
                Added.
              </JetActionMessage>
            </>
          )}
        </>
      )}
    >
      {/* <!-- Team Owner Information --> */}
      <div className="col-span-6">
        <div className="max-w-xl text-sm text-gray-600">
          Please provide the email address of the person you would like to add to this team.
        </div>
      </div>

      {/* <!-- Member Email --> */}
      <div className="col-span-6 sm:col-span-4">
        <JetLabel htmlFor="email" value="Email" />
        <JetInput
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
        />
        <JetInputError message={form.errors.email} className="mt-2" />
      </div>

      {/* <!-- Role --> */}
      {availableRoles.length > 0 && (
        <div className="col-span-6 lg:col-span-4" v-if="availableRoles.length > 0">
          <JetLabel htmlFor="roles" value="Role" />
          <JetInputError message={form.errors.role} className="mt-2" />
          <Roles
            roles={availableRoles}
            onClick={(key) => form.setData('role', key)}
            selected={form.data.role}
          />
        </div>
      )}
    </JetFormSection>
  );
};
