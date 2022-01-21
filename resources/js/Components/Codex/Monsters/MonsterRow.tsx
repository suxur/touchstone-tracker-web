import * as React from 'react';
import { useCallback } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { CodexMonster } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { useEncounter } from '@/Hooks/useEncounter';
import { CodexRow } from '../CodexRow';
import { useCodex } from '@/Components/Codex/CodexContext';

interface Props {
  monster: CodexMonster;
  highlight?: string;
}

export const MonsterRow = ({ monster, highlight }: Props) => {
  const route = useRoute();
  const { encounter } = useEncounter();
  const { dispatch } = useCodex();
  const { post } = useForm({});


  const onClick = useCallback(() => {
    post(route('encounter.add.stat-block', { encounter, stat_block: monster.id }), {
      onSuccess: (r => console.log(r)),
      onError: (e => console.log(e)),
      only: ['encounter']
    });
  }, [encounter, monster]);

  const onViewClick = useCallback(() => {
    dispatch({ type: 'open_stat_block', id: monster.id });
  }, [dispatch]);

  return (
    <CodexRow title={monster.name} onClick={onClick} onViewClick={onViewClick} highlight={highlight} />
  );
};
