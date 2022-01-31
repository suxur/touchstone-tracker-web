import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEncounter } from '@/Hooks/useEncounter';
import { JetButton } from '@/Components/Jetstream';

export const NextButton = () => {
  const { encounter, mutation } = useEncounter();

  const onClick = () => {
    if (encounter) {
      if (encounter.active_index === encounter.combatants.length - 1) {
        mutation.mutate({ ...encounter, round: encounter.round + 1, active_index: 0 });
      } else {
        mutation.mutate({ ...encounter, active_index: encounter.active_index + 1 });
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
