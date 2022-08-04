import axios from 'axios';
import { useQuery } from 'react-query';

import useRoute from '@/Hooks/useRoute';
import { StatBlock, StatBlockType } from '@/types';

export const useStatBlocks = (type: StatBlockType) => {
  const route = useRoute();

  const query = useQuery<StatBlock[]>(['stat-blocks', type], async () => {
    const { data } = await axios.get(route(`api.stat-blocks.${type}`));
    return data;
  });

  return {
    statBlocks: query.data || [],
    query,
  };
};
