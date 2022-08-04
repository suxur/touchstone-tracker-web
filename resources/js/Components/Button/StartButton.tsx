import * as React from 'react';
import { orderBy } from 'lodash';

import { useEncounter } from '@/Hooks/useEncounter';
import { JetButton } from '@/Components/Jetstream';
import { Combatant } from '@/types';
import { clone } from 'mathjs';

const orderCombatants = (combatants: Combatant[]) =>
  orderBy(clone(combatants), ['initiative'], ['desc']).map((c: Combatant, i: number) => {
    c.order = i;
    return c;
  });

export const StartButton = () => {
  const { mutation, encounter } = useEncounter();

  const onClick = () => {
    if (encounter) {
      mutation.mutate({
        ...encounter,
        is_active: true,
        started_at: new Date().toISOString(),
        combatants: orderCombatants(encounter.combatants),
        round: 1,
        active_index: 0,
      });
    }
  };

  return <JetButton onClick={onClick}>Start Encounter</JetButton>;
};
