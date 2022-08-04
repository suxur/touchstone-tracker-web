import axios from 'axios';
import { useQuery } from 'react-query';

import { Condition } from '@/types';
import useRoute from '@/Hooks/useRoute';

export const useConditions = () => {
  const route = useRoute();

  const query = useQuery<Condition[]>(['conditions'], async () => {
    const { data } = await axios.get(route('api.conditions.index'));
    return data;
  });

  return {
    conditions: query.data || [],
    query,
  };
};
