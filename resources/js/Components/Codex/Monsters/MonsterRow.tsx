import * as React from 'react';
import { useCallback } from 'react';

import { CodexMonster } from '@/types';
import { CodexRow } from '@/Components/Codex/CodexRow';
import { useCodex } from '@/Components/Codex/CodexContext';
import { useEncounter } from '@/Hooks/useEncounter';

interface Props {
  monster: CodexMonster;
  highlight?: string;
}

export const MonsterRow = ({ monster, highlight }: Props) => {
  const { addCombatant } = useEncounter();
  const { dispatch } = useCodex();

  const onClick = useCallback(() => {
    addCombatant.mutate(monster.id);
  }, [addCombatant, monster.id]);

  const onViewClick = useCallback(() => {
    dispatch({ type: 'open_stat_block', id: monster.id });
  }, [dispatch, monster.id]);

  return (
    <CodexRow
      title={monster.name}
      onClick={onClick}
      onViewClick={onViewClick}
      highlight={highlight}
    />
  );
};
