import * as React from 'react';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Combatant, Encounter } from '@/types';
import { COMBATANT_MONSTER } from '@/constants';
import { InlineInput } from '../InlineInput';
import { DeathSaves } from '@/Components/Combatant/DeathSaves';
import { Actions } from '@/Components/Encounter/Actions';
import { useEncounter } from '@/Hooks/useEncounter';
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { useUpdateCombatant } from '@/Hooks/useUpdateCombatant';

interface Props {
  active: boolean;
  combatant: Combatant;
  encounter: Encounter;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined
}

export const CombatantRow = forwardRef<HTMLDivElement, Props>(({ active, combatant, encounter, draggableProps, dragHandleProps }: Props, ref) => {
  const { data, update } = useUpdateCombatant(combatant);

  const showStatBlock = useCallback(() => {

  }, []);

  const isEditable = useMemo(() => {
    return true;
    // return (data.encounter_stats.combatant_type === COMBATANT_CHARACTER) || data.team_id !== null;
  }, [data]);

  const isDefeated = useMemo(() => {
    return data.current_hit_points === 0;
  }, [data]);

  const isMonster = useMemo(() => {
    return data.type === COMBATANT_MONSTER;
  }, [data]);

  return (
    <div ref={ref} className={clsx('flex', active ? 'bg-purple-300' : 'bg-white')} {...draggableProps}>
      <div className={clsx('flex w-10 justify-center items-center cursor-grab handle border-r px-2', { 'bg-purple-400 border-purple-400': active })} {...dragHandleProps}>
        <FontAwesomeIcon icon="grip-lines" />
      </div>
      <div className="flex flex-col flex-grow">
        <div className={clsx('flex flex-row flex-grow h-14 max-h-14 justify-between space-x-2 md:space-x-4', { 'font-bold': active })}>
          <div className="flex flex-grow items-center cursor-pointer ml-2 md:ml-4" onClick={showStatBlock}>
            <div className={clsx('h-12 w-12 rounded-md flex items-center justify-center bg-gray-100 mr-2', { 'bg-purple-400': active })}>
              <InlineInput value={data.initiative} editable={false} />
            </div>
            {data.name}
          </div>
          <div className="flex space-x-2 md:space-x-4 mr-2 md:mr-4">
            <div className="flex justify-center items-center w-28">
              <InlineInput
                value={data.current_hit_points}
                max={data.hit_point_maximum}
                onDone={v => update({ ...data, current_hit_points: parseInt(v) })}
              />
              /
              <InlineInput
                value={data.hit_point_maximum}
                editable={isEditable}
                onDone={v => update({ ...data, hit_point_maximum: parseInt(v) })}
              />
            </div>
            <div className="flex justify-center items-center w-12">
              <InlineInput
                value={data.armor_class}
                editable={isEditable}
                onDone={v => update({ ...data, armor_class: parseInt(v) })}
                shouldHighlight
              />
            </div>
          </div>
        </div>
        {encounter.is_active && (
          <div className={clsx('flex py-3 px-4 border-t', { 'border-purple-400': active })}>
            {!isDefeated && (
              <Actions active={active} combatant={combatant} />
            )}
            {isDefeated && !isMonster && (
              <DeathSaves active={active} combatant={combatant} />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

