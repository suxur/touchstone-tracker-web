import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { StatBlock, StatBlockType } from '@/types';
import useRoute from '@/Hooks/useRoute';

export const useStatBlocks = (type: StatBlockType) => {
  const route = useRoute();
  const queryClient = useQueryClient();

  const query = useQuery<StatBlock[]>(['stat-blocks', type], async () => {
    const { data } = await axios.get(route(`api.stat-blocks.${type}`));
    return data;
  });

  return {
    statBlocks: query.data || [],
    query,
  };
};
