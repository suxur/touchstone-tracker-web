import axios from 'axios';
import produce from 'immer';
import { findIndex } from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Combatant, Encounter } from '@/types';
import useRoute from '@/Hooks/useRoute';

export const useCombatant = (combatant: Combatant) => {
  const route = useRoute();
  const queryClient = useQueryClient();

  const query = useQuery<Combatant>(['combatant', combatant.id], async () => {
    const { data } = await axios.get(route('api.combatants.show', { combatant }));
    return data;
  }, {
    initialData: combatant,
    enabled: false,
  });

  const invalidate = () => {
    queryClient.invalidateQueries(['combatant', combatant.id]);
    queryClient.invalidateQueries(['encounter', combatant.encounter_id]);
  };

  const mutation = useMutation((data: Combatant) => axios.post(route('api.combatants.update', { combatant }), { ...data }), {
    onMutate: (updated: Combatant) => {
      queryClient.cancelQueries(['combatant', updated.id]);
      queryClient.cancelQueries(['encounter', updated.encounter_id]);

      const previous = queryClient.getQueryData<Encounter>(['encounter', updated.encounter_id]);
      if (previous) {
        const index = findIndex(previous.combatants, c => c.id === updated.id);
        const updatedEncounter = produce(previous, draft => {
          draft.combatants[index] = updated;
        });

        queryClient.setQueryData(['encounter', updated.encounter_id], updatedEncounter);
      }

      queryClient.setQueryData(['combatant', updated.id], updated);

      return { previous, updated };
    },
    onError: (err, updated, context) => {
      console.log(err);
      if (context?.previous) {
        queryClient.setQueryData<Encounter>(['encounter', context.updated.encounter_id], context.previous);
      }
    },
    onSuccess: () => {
      invalidate();
    },
  });

  return {
    combatant: query.data || combatant,
    query,
    mutation,
  };
};
