import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { UpdateTeamNameForm } from '@/Pages/Teams/Partials/UpdateTeamNameForm';
import { JetstreamTeamPermissions, Role, Team } from '@/types';
import { AddTeamMember } from '@/Pages/Teams/Partials/AddTeamMember';
import { JetSectionBorder } from '@/Components/Jetstream';
import { ManageTeamMembers } from '@/Pages/Teams/Partials/ManageTeamMembers';
import { PendingTeamInvitation } from '@/Pages/Teams/Partials/PendingTeamInvitation';

interface Props {
  team: Team;
  permissions: JetstreamTeamPermissions;
  availableRoles: Role[];
}

const Show = ({ availableRoles, team, permissions }: Props) => (
  <AppLayout title="Team Settings">
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 bg-gray-100">
      <UpdateTeamNameForm team={team} permissions={permissions} />
      {permissions.canAddTeamMembers && (
      <>
        <JetSectionBorder />
        <AddTeamMember
          team={team}
          availableRoles={availableRoles}
          permissions={permissions}
        />
        {team.team_invitations.length > 0 && (
        <>
          <JetSectionBorder />
          <PendingTeamInvitation team={team} permissions={permissions} />
        </>
        )}
        <JetSectionBorder />
        <ManageTeamMembers
          team={team}
          availableRoles={availableRoles}
          permissions={permissions}
        />
      </>
      )}
    </div>
  </AppLayout>
);

export default Show;
