import * as React from 'react';
import { useState } from 'react';
import { Bean } from './Bean';
import { Combatant } from '@/types';
import { useUpdateCombatant } from '@/Hooks/useUpdateCombatant';

interface Props {
  active?: boolean;
  combatant: Combatant;
  type: 'success' | 'failure'
}

export const Counter = ({ active, combatant, type }: Props) => {
  const { data, update } = useUpdateCombatant(combatant);

  const toggle = (index: number) => {
    let current = data[`death_save_${type}`];
    if (index === 1 && data[`death_save_${type}`] > 1) {
      current = 0;
    } else if (index === data[`death_save_${type}`]) {
      --current;
    } else {
      current = index;
    }

    update(`death_save_${type}`, current);
  };

  return (
    <div className="flex flex-row">
      <Bean active={active} filled={data[`death_save_${type}`] >= 1} onClick={() => toggle(1)} />
      <Bean active={active} filled={data[`death_save_${type}`] >= 2} onClick={() => toggle(2)} />
      <Bean active={active} filled={data[`death_save_${type}`] >= 3} onClick={() => toggle(3)} />
    </div>
  );
};
