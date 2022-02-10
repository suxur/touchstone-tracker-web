import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import { StatBlock, StatBlockType } from '@/types';
import useRoute from '@/Hooks/useRoute';

export const useStatBlocks = (statBlocks: StatBlock[], type: StatBlockType) => {
  const route = useRoute();

  const query = useQuery<StatBlock[]>(['stat-blocks', type], async () => {
    const { data } = await axios.get(route(`api.stat-blocks.${type}`));
    return data;
  }, {
    initialData: statBlocks,
  });

  return {
    statBlocks: query.data || statBlocks,
    query,
  };
};
