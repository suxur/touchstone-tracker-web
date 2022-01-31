import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { Encounter } from '@/types';
import { useEncounter } from '@/Hooks/useEncounter';

export const useEncounterSubscription = () => {
  const queryClient = useQueryClient();
  const { encounter } = useEncounter();

  useEffect(() => {
    if (window.Echo) {
      window.Echo.channel(encounter.slug).listen('UpdateEncounter', (e: { encounter: Encounter}) => {
        queryClient.setQueryData(['encounter', encounter.id], e.encounter);
      });
    }
  }, [encounter.id, encounter.slug, queryClient]);
};
