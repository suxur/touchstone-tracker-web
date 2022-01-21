import * as React from 'react';

import { Team } from '@/types';
import { JetDropdownLink } from '@/Components/Jetstream';
import { CircleCheckmark } from '@/Components/Svg/CircleCheckmark';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/inertia-react';

interface Props {
  team: Team;
  current: boolean;
}

export const SwitchTeamButton = ({ team, current }: Props) => {
  const route = useRoute();
  const form = useForm({ team_id: team.id });

  const switchToTeam = () => {
    form.put(route('current-team.update'));
  };

  return (
    <JetDropdownLink as="button" onClick={switchToTeam}>
      <div className="flex items-center">
        {current && <CircleCheckmark />}
        <div>{team.name}</div>
      </div>
    </JetDropdownLink>
  );
};