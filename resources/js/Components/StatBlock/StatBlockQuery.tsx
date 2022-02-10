import * as React from 'react';
import { forwardRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { StatBlock as SB } from '@/types';
import { StatBlock } from '@/Components/StatBlock/StatBlock';
import useRoute from '@/Hooks/useRoute';

interface Props {
  id: number;
}

export const StatBlockQuery = forwardRef<HTMLButtonElement, Props>(({ id }: Props, ref) => {
  const route = useRoute();

  const { data: statBlock } = useQuery<SB>(['stat-block', id], async () => {
    const { data } = await axios.get<SB>(route('api.stat-blocks.show', { stat_block: id }));
    return data;
  });

  if (statBlock) {
    return (
      <StatBlock ref={ref} statBlock={statBlock} />
    );
  }

  return null;
});
