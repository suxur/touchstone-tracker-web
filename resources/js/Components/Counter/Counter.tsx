import * as React from 'react';
import produce from 'immer';

import { Combatant } from '@/types';
import { useCombatant } from '@/Hooks/useCombatant';
import { Bean } from '@/Components/Counter/Bean';

interface Props {
  active?: boolean;
  combatant: Combatant;
  type: 'success' | 'failure';
}

export const Counter = ({ active, combatant, type }: Props) => {
  console.log(combatant);
  const { mutation } = useCombatant(combatant);

  const toggle = (index: number) => {
    let current = combatant[`death_save_${type}`];
    if (index === 1 && combatant[`death_save_${type}`] > 1) {
      current = 0;
    } else if (index === combatant[`death_save_${type}`]) {
      current -= 1;
    } else {
      current = index;
    }

    mutation.mutate(produce(combatant, draft => {
      draft[`death_save_${type}`] = current;
    }));
  };

  return (
    <div className="flex flex-row">
      <Bean active={active} filled={combatant[`death_save_${type}`] >= 1} onClick={() => toggle(1)} />
      <Bean active={active} filled={combatant[`death_save_${type}`] >= 2} onClick={() => toggle(2)} />
      <Bean active={active} filled={combatant[`death_save_${type}`] >= 3} onClick={() => toggle(3)} />
    </div>
  );
};
