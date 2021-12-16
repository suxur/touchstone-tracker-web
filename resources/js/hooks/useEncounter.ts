import { useForm, usePage } from '@inertiajs/inertia-react';
import { Page, PageProps } from '@inertiajs/inertia';
import axios from 'axios';
import { COMBATANT_CHARACTER, COMBATANT_MONSTER, routes } from '../constants';
import { Combatant, Encounter } from '@/types';

interface AddCombatantProps {
  ids: number[] | number,
  type: typeof COMBATANT_CHARACTER | typeof COMBATANT_MONSTER
}

interface RemoveCombatantProps {
  combatant: Combatant | null,
}

export const getEncounter = async (slug: string | null) => {
  const { data } = await axios.get<Encounter>(`/api/${routes.ENCOUNTER}/${slug}`);
  return data;
};

interface Props extends PageProps {
  encounter: Encounter;
}

export const useEncounter = () => {
  const { encounter } = usePage<Page<Props>>().props

  const removeCombatant = async ({ combatant }: RemoveCombatantProps) => {
    return axios.post(`/encounter/${encounter.id}/remove`, { combatant });
  };

  const addCombatant = async ({ ids, type }: AddCombatantProps) => {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    return axios.post(`/encounter/${encounter?.id}/add/${type}`, { ids }).catch(e => {
      console.log(e);
    });
  };

  // const { mutate: addCombatantMutation } = useMutation(addCombatant, {
  //   onMutate: async newCombatant => {
  //     await queryClient.cancelQueries(['encounter', encounterSlug]);
  //
  //     const previousEncounterData = queryClient.getQueriesData(['encounter', encounterSlug]);
  //
  //     queryClient.setQueryData(['encounter', encounterSlug], old => {
  //       console.log(newCombatant);
  //       // old.combatants.push(newCombatant);
  //       return old;
  //     });
  //
  //     return { previousEncounterData };
  //   },
  //   onError: (err, newCombatant, context) => {
  //     queryClient.setQueryData(['encounter', encounterSlug], context.previousEncounterData);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['encounter', encounterSlug]);
  //   }
  // });

  return {
    encounter,
    addCombatant,
    removeCombatant,
  };
};
