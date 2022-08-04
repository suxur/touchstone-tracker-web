import axios from 'axios';
import { useQuery } from 'react-query';

import useRoute from '@/Hooks/useRoute';
import { StatBlock } from '@/types';

export const useStatBlock = (stat_block: number) => {
  const route = useRoute();

  const query = useQuery<StatBlock>(['stat-block', stat_block], async () => {
    const { data } = await axios.get(route('api.stat-blocks.show', { stat_block }));
    return data;
  }, {
    enabled: false,
  });

  return {
    query,
  };
};
