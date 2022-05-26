import * as React from 'react';

import { useEncounter } from '@/Hooks/useEncounter';
import { JetButton } from '@/Components/Jetstream';
import { roll } from '@/Dice';

export const RollAllButton = () => {
  const { mutation, encounter } = useEncounter();

  const onClick = () => {
    if (encounter) {
      const combatants = encounter.combatants.map(combatant => ({
        ...combatant,
        initiative: roll(`d20+${combatant.stat_block?.initiative || 0}`),
      }));

      mutation.mutate({
        ...encounter,
        combatants,
      });
    }
  };

  return <JetButton bg="transparent" onClick={onClick}>Roll All</JetButton>;
};
