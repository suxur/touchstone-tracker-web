import * as React from 'react';

import { useEncounter } from '@/Hooks/useEncounter';
import { JetDangerButton } from '@/Components/Jetstream';

export const EndAndClearButton = () => {
  const { mutation, encounter } = useEncounter();

  const onClick = () => {
    if (encounter) {
      mutation.mutateAsync({ ...encounter, is_active: false, combatants: [] });
    }
  };

  return (
    <JetDangerButton onClick={onClick} processing={mutation.isLoading}>
      End &amp; Clear
    </JetDangerButton>
  );
};
