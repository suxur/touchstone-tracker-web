import axios from 'axios';
import { orderBy } from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PageProps } from '@inertiajs/inertia';

import { CodexEncounter, Combatant, Encounter } from '@/types';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props extends PageProps {
  encounter: Encounter;
}

export const useEncounter = () => {
  const route = useRoute();
  const queryClient = useQueryClient();

  const { encounter } = useTypedPage<Props>().props;

  const query = useQuery<Encounter>(['encounter', encounter.id], async () => {
    const { data } = await axios.get(route('api.encounters.show', { encounter }));
    return data;
  }, {
    initialData: encounter,
    refetchOnMount: false,
  });

  const mutation = useMutation((data: Encounter) => axios.put(route('api.encounters.update', { encounter }), { ...data }), {
    onSuccess: (response) => {
      queryClient.setQueryData(['encounter', encounter.id], response.data);
    },
  });

  const store = useMutation((data: null) => axios.post(route('api.encounters.store')), {
    onSuccess: () => {
      queryClient.invalidateQueries(['codex/encounters']);
    },
  });

  const destroy = useMutation((encounter: CodexEncounter) => axios.delete(route('api.encounters.destroy', { encounter })), {
    onSuccess: () => {
      queryClient.invalidateQueries(['codex/encounters']);
    },
  });

  const optimistic = useMutation((data: Encounter) => axios.post(route('api.encounters.update', { encounter }), { ...data }), {
    onMutate: async (updatedEncounter: Encounter) => {
      await queryClient.cancelQueries(['encounter', updatedEncounter.id]);
      const previousEncounter = queryClient.getQueryData<Encounter>(['encounter', updatedEncounter.id]);

      if (!previousEncounter?.is_active && updatedEncounter.is_active) {
        const orderedCombatants = orderBy(encounter.combatants, ['initiative']).map((c, i) => {
          c.order = i;
          return c;
        });
        queryClient.setQueryData(['encounter', updatedEncounter.id], {
          ...updatedEncounter,
          combatants: orderedCombatants,
        });
      }

      if (previousEncounter?.is_active && !updatedEncounter.is_active) {
        queryClient.setQueryData(['encounter', updatedEncounter.id], {
          ...updatedEncounter,
        });
      }

      return { previousEncounter, updatedEncounter };
    },
    onError: (err, updatedEncounter, context) => {
      if (context?.previousEncounter) {
        queryClient.setQueryData<Encounter>(['encounter', context.updatedEncounter.id], context.previousEncounter);
      }
    },
    onSuccess: (response) => {
      queryClient.setQueryData(['encounter', encounter.id], response.data);
    },
  });

  const add = useMutation(({
    name, type
  }: { name: string, type: string }) => axios.post(route('api.encounters.combatants.store', {
    encounter, name, stat_block_type: type,
  })), {
    onSuccess: response => {
      queryClient.setQueryData(['encounter', encounter.id], response.data);
      queryClient.invalidateQueries(['codex/characters']);
      queryClient.invalidateQueries(['codex/monsters']);
    },
  });

  const addCombatant = useMutation((id: number) => axios.post(route('api.encounters.add.stat-block', {
    encounter, stat_block: id,
  })), {
    onSuccess: response => {
      queryClient.setQueryData(['encounter', encounter.id], response.data);
    },
  });

  const removeCombatant = useMutation((id: number) => axios.delete(route('api.encounters.combatants.destroy', {
    encounter, combatant: id,
  })), {
    onSuccess: response => {
      queryClient.setQueryData(['encounter', encounter.id], response.data);
    },
  });

  const updateCombatantsOrder = useMutation((data: Combatant[]) => axios.post(route('api.encounters.combatants.order', { encounter }), { combatants: data }), {
    onMutate: () => {
      queryClient.cancelQueries(['encounter', encounter.id]);
    },
    onSuccess: response => {
      queryClient.setQueryData(['encounter', encounter.id], response.data);
    },
  });

  const updateCombatantsInitiative = useMutation((data: Encounter) => axios.post(route('api.encounters.update', { encounter }), { ...data }), {
    onMutate: async (updatedEncounter: Encounter) => {
      await queryClient.cancelQueries(['encounter', updatedEncounter.id]);
      const previousEncounter = queryClient.getQueryData<Encounter>(['encounter', updatedEncounter.id]);

      if (!previousEncounter?.is_active && updatedEncounter.is_active) {
        const orderedCombatants = orderBy(encounter.combatants, ['initiative']).map((c, i) => {
          c.order = i;
          return c;
        });
        queryClient.setQueryData(['encounter', updatedEncounter.id], {
          ...updatedEncounter,
          combatants: orderedCombatants,
        });
      }

      return { previousEncounter, updatedEncounter };
    },
    onError: (err, updatedEncounter, context) => {
      if (context?.previousEncounter) {
        queryClient.setQueryData<Encounter>(['encounter', context.updatedEncounter.id], context.previousEncounter);
      }
    },
    onSuccess: (response) => {
      queryClient.setQueryData(['encounter', encounter.id], response.data);
    },
  });

  return {
    encounter: query.data || encounter,
    query,
    mutation,
    optimistic,
    add,
    addCombatant,
    removeCombatant,
    updateCombatantsOrder,
    updateCombatantsInitiative,
    store,
    destroy,
  };
};
