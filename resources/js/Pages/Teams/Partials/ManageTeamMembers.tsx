import * as React from 'react';
import { useCallback, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { JetstreamTeamPermissions, Role, Team, User } from '@/types';
import useRoute from '@/hooks/useRoute';
import {
  JetActionSection,
  JetButton,
  JetConfirmationModal,
  JetDialogModal,
  JetSecondaryButton
} from '@/Components/Jetstream';
import useTypedPage from '@/hooks/useTypedPage';
import clsx from 'clsx';

interface Props {
  team: Team;
  availableRoles: Role[];
  permissions: JetstreamTeamPermissions;
}

export const ManageTeamMembers = ({ team, permissions, availableRoles }: Props) => {
  const page = useTypedPage();
  const route = useRoute();

  const [managingRoleFor, setManagingRoleFor] = useState<User>();
  const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
  const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);

  const form = useForm({
    _method: 'PUT',
    email: '',
    role: '',
  });

  const updateRoleForm = useForm({
    _method: 'PUT',
    role: '',
  });

  const leaveForm = useForm({});
  const leaveTeam = () => {
    leaveForm.delete(route('team-members.destroy', { team, user: page.props.user }));
  }

  const addTeamMember = () => {
    form.post(route('teams.update', { team }), {
      errorBag: 'updateTeamName',
      preserveScroll: true,
    });
  };

  const updateRole = () => {
    updateRoleForm.put(route('team-members.update', { team, user: currentlyManagingRole }), {
      preserveScroll: true,
      onSuccess: () => setCurrentlyManagingRole(false)
    });
  };

  const manageRole = (user: User) => {
    updateRoleForm.setData('role', user.membership.role);
    setManagingRoleFor(user);
    setCurrentlyManagingRole(true);
  };

  const displayableRole = useCallback((role: string) => {
    return availableRoles.find(r => r.key === role)?.name;
  }, [availableRoles]);

  const confirmLeavingTeam = () => {
  };

  const confirmTeamMemberRemoval = (user: User) => {

  };

  return (
    <JetActionSection
      title={'Team Members'}
      description={`All of the people that are part of this team.`}
    >
      <div className="space-y-6">
        {team.users.map(user => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full" src={user.profile_photo_url} alt={user.name} />
              <div className="ml-4">{user.name}</div>
            </div>
            <div className="flex items-center">
              {team.owner.id !== user.id && permissions.canAddTeamMembers && availableRoles.length ? (
                <button
                  className="ml-2 text-sm text-gray-400 underline"
                  onClick={() => manageRole(user)}
                >
                  {displayableRole(user.membership.role)}
                </button>
              ) : (
                <>
                  {availableRoles.length && (
                    <div className="ml-2 text-sm text-gray-400">
                      {displayableRole(user.membership.role)}
                    </div>
                  )}
                </>
              )}

              {page.props.user.id === user.id && team.owner.id !== user.id && (
                <button
                  className="cursor-pointer ml-6 text-sm text-red-500"
                  onClick={confirmLeavingTeam}
                >
                  Leave
                </button>
              )}

              {page.props.user.id !== user.id && permissions.canRemoveTeamMembers && (
                <button
                  className="cursor-pointer ml-6 text-sm text-red-500"
                  onClick={() => confirmTeamMemberRemoval(user)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <JetDialogModal isOpen={currentlyManagingRole} onClose={() => setCurrentlyManagingRole(false)}>
        <JetDialogModal.Content title="Manage Role">
          <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
            {availableRoles.map((role, i) => (
              <button
                key={role.key}
                type="button"
                className={clsx(
                  'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200',
                  {
                    'border-t border-gray-200 rounded-t-none': i > 0,
                    'rounded-b-none': i !== Object.keys(availableRoles).length - 1
                  }
                )}
                onClick={() => updateRoleForm.setData('role', role.key)}
              >
                <div className={clsx({ 'opacity-50': updateRoleForm.data.role && updateRoleForm.data.role !== role.key })}>
                  <div className="flex items-center">
                    <div className={clsx('text-sm text-gray-600', { 'font-semibold': updateRoleForm.data.role === role.key })}>
                      {role.name}
                    </div>
                    {updateRoleForm.data.role === role.key && (
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
          <JetDialogModal.Footer>
            <JetSecondaryButton onClick={() => setCurrentlyManagingRole(false)}>Cancel</JetSecondaryButton>
            <JetButton
              className={clsx('ml-2', { 'opacity-25': updateRoleForm.processing })}
              onClick={updateRole}
              disabled={updateRoleForm.processing}
            >
              Save
            </JetButton>
          </JetDialogModal.Footer>
        </JetDialogModal.Content>
      </JetDialogModal>

      <JetConfirmationModal isOpen={confirmingLeavingTeam} onClose={() => setConfirmingLeavingTeam(false)}>
        <JetConfirmationModal.Content title="Leave Team">
            Are you sure you would like to leave this team?
        </JetConfirmationModal.Content>
        <JetConfirmationModal.Footer>
          <JetSecondaryButton onClick={() => setConfirmingLeavingTeam(false)}>Cancel</JetSecondaryButton>
          <JetButton
            className={clsx('ml-2', { 'opacity-25': leaveForm.processing })}
            onClick={leaveTeam}
            disabled={leaveForm.processing}
          >
            Leave
          </JetButton>
        </JetConfirmationModal.Footer>
      </JetConfirmationModal>

      {/*  <!-- Remove Team Member Confirmation Modal -->*/}
      {/*  <JetConfirmationModal :show="teamMemberBeingRemoved" @close="teamMemberBeingRemoved = null">*/}
      {/*    <template #title>*/}
      {/*  Remove Team Member*/}
      {/*  </template>*/}

      {/*  <template #content>*/}
      {/*  Are you sure you would like to remove this person from the team?*/}
      {/*</template>*/}

      {/*  <template #footer>*/}
      {/*  <jet-secondary-button @click="teamMemberBeingRemoved = null">*/}
      {/*    Cancel*/}
      {/*    </jet-secondary-button>*/}

      {/*  <jet-danger-button class="ml-2" @click="removeTeamMember" :class="{ 'opacity-25': removeTeamMemberForm.processing }" :disabled="removeTeamMemberForm.processing">*/}
      {/*    Remove*/}
      {/*    </jet-danger-button>*/}
      {/*</template>*/}
      {/*</JetConfirmationModal>*/}

    </JetActionSection>
  );
};
