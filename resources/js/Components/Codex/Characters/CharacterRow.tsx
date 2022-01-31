import * as React from 'react';
import { useCallback } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { CodexCharacter } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { useEncounter } from '@/Hooks/useEncounter';
import { useCodex } from '@/Components/Codex/CodexContext';
import { ViewButton } from '@/Components/Button/ViewButton';
import { ClassIcon } from '@/Components/ClassIcon/ClassIcon';

interface Props {
  character: CodexCharacter;
}

export const CharacterRow = ({ character }: Props) => {
  const { addCombatant } = useEncounter();
  const { dispatch } = useCodex();

  const onClick = useCallback(() => {
    addCombatant.mutate(character.id);
  }, [addCombatant, character.id]);

  const onViewClick = useCallback(() => {
    dispatch({ type: 'open_stat_block', id: character.id });
  }, [dispatch, character.id]);

  return (
    <div
      className="group cursor-pointer flex flex-row justify-between items-center hover:bg-gray-200 odd:bg-white even:bg-gray-50"
    >
      <div className="flex flex-1 justify-center items-center">
        <div className="w-8 mx-2">
          {character.class ? (
            <ClassIcon icon={character.class} size="sm" />
          ) : (
            <img
              className="w-8 h-8 rounded-full"
              src={`https://ui-avatars.com/api/?name=${encodeURI(character.name)}&color=7C3AED&background=DDD6FE`}
              alt={character.name}
            />
          )}
        </div>
        <button
          type="button"
          className="bg-transparent border-0 pr-4 lg:pr-6 py-4 flex flex-1"
          onClick={onClick}
        >
          {character.name}
        </button>
      </div>
      {onViewClick && (
        <div className="flex w-10 mr-4 lg:mr-6 justify-end">
          <ViewButton
            className="hidden group-hover:flex"
            onClick={onViewClick}
          />
        </div>
      )}
    </div>
  );
};
