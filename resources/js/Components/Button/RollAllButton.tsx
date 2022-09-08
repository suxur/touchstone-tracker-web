import * as React from 'react';

import { useEncounter } from '@/Hooks/useEncounter';
import { roll } from '@/Dice';
import { Button } from '@/Components/Button';

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

  return <Button bg="transparent" onClick={onClick}>Roll All</Button>;
};
