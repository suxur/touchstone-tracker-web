import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEncounter } from "@/Hooks/useEncounter";
import { Button } from '@/Components/Button';

export const NextButton = () => {
  const { encounter, mutation } = useEncounter();

  if (!encounter) {
    return null;
  }

  const isNewRound = () => {
    return encounter.active_index === encounter.combatants.length - 1;
  };

  const onClick = () => {
    if (isNewRound()) {
      const combatants = encounter.combatants.map((combatant) => ({
        ...combatant,
        action: false,
        bonus_action: false,
        reaction: false,
      }));

      mutation.mutate({
        ...encounter,
        round: encounter.round + 1,
        active_index: 0,
        combatants,
      });
    } else {
      mutation.mutate({
        ...encounter,
        active_index: encounter.active_index + 1,
      });
    }
  };

  return (
    <Button onClick={onClick}>
      Next
      <FontAwesomeIcon icon="chevron-right" className="ml-1" />
    </Button>
  );
};
