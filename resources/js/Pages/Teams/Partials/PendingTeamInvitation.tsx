import * as React from 'react';
import { JetActionSection } from '@/Components/Jetstream';
import { JetstreamTeamPermissions, Team } from '@/types';
import { useForm } from '@inertiajs/inertia-react';
import { useCallback } from 'react';
import useRoute from '@/hooks/useRoute';

type Props = {
  team: Team;
  permissions: JetstreamTeamPermissions
};

export const PendingTeamInvitation = ({ team, permissions }: Props) => {
  const form = useForm({});
  const route = useRoute();

  const cancelTeamInvitation = useCallback((invitation) => {
    form.delete(route('team-invitations.destroy', { invitation }), {
      preserveScroll: true
    });
  }, [form]);

  return (
    <JetActionSection
      title="Pending Team Invitation"
      description="These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation."
    >
      <div className="space-y-6">
        {team.team_invitations.map(invitation => (
          <div
            key={invitation.id}
            className="flex items-center justify-between"
            v-for="invitation in team.team_invitations"
          >
            <div className="text-gray-600">{invitation.email}</div>
            <div className="flex items-center">
              {permissions.canRemoveTeamMembers && (
                <button
                  className="cursor-pointer ml-6 text-sm text-red-500 focus:outline-none"
                  onClick={() => cancelTeamInvitation(invitation)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </JetActionSection>
  )
    ;
};
