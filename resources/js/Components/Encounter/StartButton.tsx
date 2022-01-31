import * as React from 'react';

import { useEncounter } from '@/Hooks/useEncounter';
import { JetButton } from '@/Components/Jetstream';

export const StartButton = () => {
  const { mutation, encounter } = useEncounter();

  const onClick = () => {
    if (encounter) {
      mutation.mutate({ ...encounter, is_active: true });
    }
  };

  return (
    <JetButton onClick={onClick}>
      Start Encounter
    </JetButton>
  );
};