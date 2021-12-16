import * as React from 'react';
import { forwardRef } from 'react';
import { StatLine } from './StatLine';
import { ActionLine } from './ActionLine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Combatant } from '@/types';

interface Props {
  id: number;
  type: 'monster' | 'character';
}

export const getCombatant = async (id: number, type: 'monster' | 'character') => {
  const { data } = await axios.get<Combatant>(`/api/${type}/${id}`);
  return data;
};

export const StatBlockQuery = forwardRef<HTMLButtonElement, Props>(({ id, type }: Props, ref) => {
  const { data: combatant } = useQuery<Combatant>([type, id], () => getCombatant(id, type));

  if (combatant) {
    return (
      <>
        <div
          className="bg-white rounded-md border-t-4 border-b-4 border-purple-400 h-full filter drop-shadow flex flex-grow overflow-hidden flex-col absolute inset-0 z-20"
        >
          <div className="relative px-4 pt-4">
            <div className="flex flex-row justify-between">
              <p className="text-xl font-bold">{combatant.name}</p>
              <button
                ref={ref}
                className="relative rounded-full flex flex-shrink-0 justify-center items-center bg-red-200 text-red-400 h-6 w-6"
              >
                <FontAwesomeIcon icon="times" className="stat-block-close" />
              </button>
            </div>
            {combatant.size && combatant.alignment && (
              <p className="italic">{combatant.size}, {combatant.alignment}</p>
            )}
          </div>
          <hr className="my-2" />
          <div className="flex flex-col overflow-auto relative h-full">
            <div className="absolute inset-0">
              <div className="p-4 pt-0">
                <StatLine title="Armor Class" stat={combatant.armor_class} />
                <StatLine title="Hit Points" stat={combatant.hit_points} />
                <StatLine title="Speed" stat={combatant.speed} />
                <hr className="my-2" />
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">STR</p>
                    <p>{combatant.strength} ({combatant.strength_modifier})</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">DEX</p>
                    <p>{combatant.dexterity} ({combatant.dexterity_modifier})</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">CON</p>
                    <p>{combatant.constitution} ({combatant.constitution_modifier})</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">INT</p>
                    <p>{combatant.intelligence} ({combatant.intelligence_modifier})</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">WIS</p>
                    <p>{combatant.wisdom} ({combatant.wisdom_modifier})</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">CHA</p>
                    <p>{combatant.charisma} ({combatant.charisma_modifier})</p>
                  </div>
                </div>
                <hr className="my-2" />
                <StatLine title="Damage Vulnerabilities" stat={combatant.damage_vulnerabilities} />
                <StatLine title="Damage Resistances" stat={combatant.damage_resistances} />
                <StatLine title="Damage Immunities" stat={combatant.damage_immunities} />
                <StatLine title="Condition Immunities" stat={combatant.condition_immunities} />
                <StatLine title="Senses" stat={combatant.senses} />
                <div className="flex-row">
                  <StatLine title="Challenge" stat={combatant.challenge_rating} />
                  <p> ({combatant.experience_points} XP)</p>
                </div>
                {combatant.special_abilities.length > 0 && (
                  <>
                    <hr className="my-3" />
                    {combatant.special_abilities.map(action => (
                      <ActionLine key={action.id} action={action} />
                    ))}
                  </>
                )}
                {combatant.actions.length > 0 && (
                  <>
                    <p className="text-lg underline">Actions</p>
                    {combatant.actions.map(action => (
                      <ActionLine key={action.id} action={action} />
                    ))}
                  </>
                )}
                {combatant.reactions.length > 0 && (
                  <>
                    <p className="text-lg underline">Reactions</p>
                    {combatant.reactions.map(action => (
                      <ActionLine key={action.id} action={action} />
                    ))}
                  </>
                )}
                {combatant.legendary_actions.length > 0 && (
                  <>
                    <p className="text-lg underline">Legendary Actions</p>
                    {combatant.legendary_actions.map(action => (
                      <ActionLine key={action.id} action={action} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
});


