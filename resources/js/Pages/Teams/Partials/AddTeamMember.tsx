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
import useRoute from '@/hooks/useRoute';

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

          <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
            {availableRoles.map((role, i) => (
              <button
                type="button"
                className={clsx(
                  'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200',
                  {
                    'border-t border-gray-200 rounded-t-none': i > 0,
                    'rounded-b-none': i != Object.keys(availableRoles).length - 1
                  },
                )}
                onClick={() => {
                  form.setData('role', role.key);
                }}
                key={role.key}
              >
                <div className={clsx({ 'opacity-50': form.data.role && form.data.role != role.key })}>
                  {/* <!-- Role Name --> */}
                  <div className="flex items-center">
                    <div className={clsx('text-sm text-gray-600', { 'font-semibold': form.data.role == role.key })}>
                      {role.name}
                    </div>

                    {form.data.role === role.key && (
                      <svg
                        className="ml-2 h-5 w-5 text-green-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>

                  {/* <!-- Role Description --> */}
                  <div className="mt-2 text-xs text-gray-600 text-left">
                    {role.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </JetFormSection>
  );
};
