import * as React from 'react';
import { forwardRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { StatBlock as SB } from '@/types';
import { StatBlock } from '@/Components/StatBlock/StatBlock';

interface Props {
  id: number;
}

export const getStatBlock = async (id: number) => {
  const { data } = await axios.get<SB>(`/api/stat-block/${id}`);
  return data;
};

export const StatBlockQuery = forwardRef<HTMLButtonElement, Props>(({ id }: Props, ref) => {
  const { data: statBlock } = useQuery<SB>(['stat_block', id], () => getStatBlock(id));

  if (statBlock) {
    return (
      <StatBlock ref={ref} statBlock={statBlock} />
    );
  }

  return null;
});
