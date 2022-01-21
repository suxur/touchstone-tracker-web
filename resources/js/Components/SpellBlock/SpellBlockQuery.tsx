import * as React from 'react';
import { forwardRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { Spell } from '@/types';
import { SpellBlock } from '@/Components/SpellBlock/SpellBlock';

interface Props {
  id: number;
}

export const getSpell = async (id: number) => {
  const { data } = await axios.get<Spell>(`/api/spell/${id}`);
  return data;
};
export const SpellBlockQuery = forwardRef<HTMLButtonElement, Props>(({ id }: Props, ref) => {
  const { data: spell } = useQuery<Spell>(['spell', id], () => getSpell(id));

  if (spell) {
    return (
      <SpellBlock ref={ref} spell={spell} />
    );
  }

  return null;
});
