import * as React from 'react';
import { useMemo } from 'react';
import clsx from 'clsx';

import { Combatant } from '@/types';
import { useCombatant } from '@/Hooks/useCombatant';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { Checkbox } from '@/Components/Checkbox';

type Props = {
  combatant: Combatant;
  active?: boolean;
  disabled?: boolean;
};

export const Actions = ({ combatant, active, disabled }: Props) => {
  const { mutation } = useCombatant(combatant);

  const update = (newData: Combatant) => {
    mutation.mutate(newData);
  };

  const clear = () => {
    mutation.mutate({ ...combatant, action: false, bonus_action: false, reaction: false });
  };

  const labelClass = useMemo(() => clsx('flex items-center justify-center', disabled ? 'cursor-not-allowed' : 'cursor-pointer'), [disabled]);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className={clsx('bg-gray-100 rounded-md px-2 h-10 text-sm flex justify-around sm:justify-center items-center space-x-4', { 'bg-purple-400': active })}>
        <label className={labelClass}>
          <Checkbox
            className="mr-1"
            name="action"
            disabled={disabled}
            checked={combatant.action}
            onChange={() => update({ ...combatant, action: !combatant.action })}
          />
          <span>Action</span>
        </label>
        <label className={labelClass}>
          <Checkbox
            className="mr-2"
            disabled={disabled}
            checked={combatant.bonus_action}
            onChange={() => update({ ...combatant, bonus_action: !combatant.bonus_action })}
          />
          <span>
            Bonus
            <span className="ml-1 hidden sm:inline-block">Action</span>
          </span>
        </label>
        <label className={labelClass}>
          <Checkbox
            className="mr-1"
            disabled={disabled}
            checked={combatant.reaction}
            onChange={() => update({ ...combatant, reaction: !combatant.reaction })}
          />
          <span>Reaction</span>
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
