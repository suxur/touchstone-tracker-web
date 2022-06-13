import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEncounter } from "@/Hooks/useEncounter";
import { JetButton } from "@/Components/Jetstream";

export const NextButton = () => {
  const { encounter, mutation } = useEncounter();

  const isNewRound = () => {
    if (!encounter) return false;

    return encounter.active_index === encounter.combatants.length - 1;
  };

  const onClick = () => {
    if (encounter) {
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
    }
  };

  return (
    <JetButton onClick={onClick}>
      Next
      <FontAwesomeIcon icon="chevron-right" className="ml-1" />
    </JetButton>
  );
};
