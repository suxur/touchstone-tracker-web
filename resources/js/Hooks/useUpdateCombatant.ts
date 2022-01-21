import { useEffect } from 'react';
import { setDataByKeyValuePair, setDataByMethod, setDataByObject, useForm } from '@inertiajs/inertia-react';

import { Combatant } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { useIsMounting } from '@/Hooks/useIsMounting';

export const useUpdateCombatant = (combatant: Combatant) => {
  const isMounting = useIsMounting();
  const route = useRoute();
  const form = useForm<Combatant>({ ...combatant });

  useEffect(() => {
    if (isMounting) {
      return;
    }

    form.post(route('combatants.update', { combatant }));
  }, [form.data]);


  return {
    data: form.data,
    update: form.setData,
  };
};