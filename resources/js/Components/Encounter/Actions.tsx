import * as React from 'react';
import clsx from 'clsx';

import { JetCheckbox } from '@/Components/Jetstream';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { Combatant } from '@/types';
import { useForm } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import useRoute from '@/Hooks/useRoute';
import { useIsMounting } from '@/Hooks/useIsMounting';
import { useUpdateCombatant } from '@/Hooks/useUpdateCombatant';

type Props = {
  combatant: Combatant;
  active?: boolean;
  disabled?: boolean;
};

export const Actions = ({ combatant, active, disabled }: Props) => {
  const isMounted = useIsMounting();
  const route = useRoute();
  const { data, update } = useUpdateCombatant(combatant);

  const clear = () => {
    update({ ...data, action: false, bonus_action: false, reaction: false });
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className={clsx('bg-gray-100 rounded-md px-2 h-10 text-sm flex justify-around sm:justify-center items-center space-x-4', { 'bg-purple-400': active })}>
        <label className="flex items-center justify-center cursor-pointer">
          <span>Action</span>
          <JetCheckbox
            className="ml-1"
            name="action"
            disabled={disabled}
            checked={data.action}
            onChange={() => update('action', !data.action)}
          />
        </label>
        <label className="flex items-center justify-center cursor-pointer">
          <span>Bonus <span className="hidden sm:inline-block">Action</span></span>
          <JetCheckbox
            className="ml-1"
            disabled={disabled}
            checked={data.bonus_action}
            onChange={() => update('bonus_action', !data.bonus_action)}
          />
        </label>
        <label className="flex items-center justify-center cursor-pointer">
          <span>Reaction</span>
          <JetCheckbox
            className="ml-1"
            disabled={disabled}
            checked={data.reaction}
            onChange={() => update('reaction', !data.reaction)}
          />
        </label>
      </div>
      {!disabled && (
        <JetTransparentButton
          className={clsx('mt-2 sm:ml-1 sm:mt-0', active ? 'text-gray-700' : 'text-gray-500')}
          onClick={clear}
        >
          Clear
        </JetTransparentButton>
      )}
    </div>
  );
};
