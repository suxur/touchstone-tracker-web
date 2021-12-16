import * as React from 'react';
import { useCallback } from 'react';
import { CodexMonster } from '@/types';
import { CodexRow } from '../CodexRow';
import { useEncounter } from '../../../hooks/useEncounter';
import { COMBATANT_MONSTER } from '../../../constants';
import { useForm } from '@inertiajs/inertia-react';

interface Props {
  monster: CodexMonster;
}

export const MonsterRow = ({ monster }: Props) => {
  const { encounter } = useEncounter();
  const { post } = useForm({ ids: [monster.id] });

  const onClick = useCallback(() => {
    post(`/encounter/${encounter.id}/add/${COMBATANT_MONSTER}`, {
      onSuccess: (r => console.log(r)),
      onError: (e => console.log(e)),
      only: ['encounter', 'combatants', 'characters']
    });
  }, []);

  const onViewClick = useCallback(() => {
  }, []);

  return (
    <CodexRow title={monster.name} onClick={onClick} onViewClick={onViewClick} />
  );
};
