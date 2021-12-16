import * as React from 'react';
import { useCallback, useContext, useMemo } from 'react';
import clsx from 'clsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EncounterContext } from './EncounterProvider';
import { Combatant } from '@/types';
import { COMBATANT_CHARACTER } from '../../constants';
import { InlineInput } from '../InlineInput';
import { DeleteButton } from '../Button/DeleteButton';

interface Props {
  active: boolean;
  combatant: Combatant;
}

export const CombatantRow = ({ active, combatant }: Props) => {
  const { remove, setRemove } = useContext(EncounterContext);

  const showStatBlock = useCallback(() => {

  }, []);

  const deleteRow = useCallback(() => {
    setRemove({
      name: combatant.encounter_stats.unique_name || combatant.name,
      combatant,
      isOpen: true,
      isDeleting: false,
    });
  }, [combatant, setRemove]);

  const isEditable = useMemo(() => {
    return (combatant.encounter_stats.combatant_type === COMBATANT_CHARACTER) || combatant.team_id !== null;
  }, [combatant]);

  return (
    <>
      <div className={clsx('grid grid-cols-12 gap-x-2 col-span-12', { 'bg-purple-300': active })}>
        <div
          className={clsx('col-span-1 flex justify-center items-center cursor-move handle border-r px-2', { 'bg-purple-400 border-purple-400': active })}
        >
          <FontAwesomeIcon icon="grip-lines" />
        </div>
        <div className="col-span-11">
          <div className={clsx('flex h-14 max-h-14 justify-between', { 'font-bold': active })}>
            <div className="flex items-center cursor-pointer" onClick={showStatBlock}>
              {combatant.encounter_stats.unique_name}
            </div>
            <div className="flex space-x-2 md:space-x-4 mr-2 md:mr-4">
              <div className="flex justify-center items-center w-28">
                <InlineInput value={combatant.encounter_stats.hit_points} max={combatant.hit_points} />
                /
                <InlineInput value={combatant.hit_points} editable={isEditable} />
              </div>
              <div className="flex justify-center items-center w-12">
                <InlineInput value={combatant.armor_class} editable={isEditable} />
              </div>
              <div className="flex justify-center items-center w-12">
                <InlineInput value={combatant.encounter_stats.initiative} />
              </div>
              {!active && (
                <div className="flex justify-center items-center w-12">
                  <DeleteButton onClick={deleteRow} loading={remove.isDeleting && remove.combatant?.encounter_stats.unique_id === combatant.encounter_stats.unique_id}/>
                </div>
              )}
            </div>
          </div>
          {/*<actions v-show="!isDefeated" :combatant="combatant" :encounter="encounter" :active="active"></actions>*/}
          {/*<death-saves v-show="isDefeated && !isMonster" :combatant="combatant" :encounter="encounter" :active="active"></death-saves>*/}
        </div>
      </div>
    </>
  );
};

