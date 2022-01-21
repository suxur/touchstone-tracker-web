import * as React from 'react';
import { JetButton } from '@/Components/Jetstream';
import { useUpdateEncounter } from '@/Hooks/useUpdateEncounter';

export const StartButton = () => {
  const { update } = useUpdateEncounter({});

  const onClick = () => {
    update('is_active', true);
  };

  return (
    <JetButton onClick={onClick}>
      Start Encounter
    </JetButton>
  );
};