import * as React from 'react';
import { StatLine } from './StatLine';
import { ActionLine } from './ActionLine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';
import { StatBlock as SB } from '@/types';
import { Divider } from '@/Components/StatBlock/Divider';

interface Props {
  stat_block: SB;
}

export const StatBlock = forwardRef<HTMLButtonElement, Props>(({ stat_block }: Props, ref) => {
  return (
    <>
      <div
        className="bg-white rounded-md border-t-4 border-b-4 border-purple-400 h-full filter drop-shadow flex flex-grow overflow-hidden flex-col absolute inset-0 z-20"
      >
        <div className="relative px-4 pt-4">
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold">{stat_block.name}</p>
            <button
              ref={ref}
              className="relative rounded-full flex flex-shrink-0 justify-center items-center bg-red-200 text-red-400 h-6 w-6"
            >
              <FontAwesomeIcon icon="times" className="stat-block-close" />
            </button>
          </div>
          {stat_block.size && stat_block.alignment && (
            <p className="italic">{stat_block.size}, {stat_block.alignment}</p>
          )}
        </div>
        <Divider />
        <div className="flex flex-col overflow-auto relative h-full">
          <div className="absolute inset-0">
            <div className="p-4 pt-0">
              <StatLine title="Armor Class" stat={stat_block.armor_class} />
              <StatLine title="Hit Points" stat={stat_block.hit_points} />
              <StatLine title="Speed" stat={stat_block.speed} />
              <Divider />
              <div className="flex flex-row justify-around">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">STR</p>
                  <p>{stat_block.strength} ({stat_block.strength_modifier})</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">DEX</p>
                  <p>{stat_block.dexterity} ({stat_block.dexterity_modifier})</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">CON</p>
                  <p>{stat_block.constitution} ({stat_block.constitution_modifier})</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">INT</p>
                  <p>{stat_block.intelligence} ({stat_block.intelligence_modifier})</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">WIS</p>
                  <p>{stat_block.wisdom} ({stat_block.wisdom_modifier})</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">CHA</p>
                  <p>{stat_block.charisma} ({stat_block.charisma_modifier})</p>
                </div>
              </div>
              <Divider />
              <StatLine title="Damage Vulnerabilities" stat={stat_block.damage_vulnerabilities} />
              <StatLine title="Damage Resistances" stat={stat_block.damage_resistances} />
              <StatLine title="Damage Immunities" stat={stat_block.damage_immunities} />
              <StatLine title="Condition Immunities" stat={stat_block.condition_immunities} />
              <StatLine title="Senses" stat={stat_block.senses} />
              <div className="flex-row">
                <StatLine title="Challenge" stat={stat_block.challenge_rating} />
                <p> ({stat_block.experience_points} XP)</p>
              </div>
              {stat_block.special_abilities.length > 0 && (
                <>
                  <Divider />
                  {stat_block.special_abilities.map(action => (
                    <ActionLine key={action.id} action={action} />
                  ))}
                </>
              )}
              {stat_block.actions.length > 0 && (
                <>
                  <p className="text-lg underline">Actions</p>
                  {stat_block.actions.map(action => (
                    <ActionLine key={action.id} action={action} />
                  ))}
                </>
              )}
              {stat_block.reactions.length > 0 && (
                <>
                  <p className="text-lg underline">Reactions</p>
                  {stat_block.reactions.map(action => (
                    <ActionLine key={action.id} action={action} />
                  ))}
                </>
              )}
              {stat_block.legendary_actions.length > 0 && (
                <>
                  <p className="text-lg underline">Legendary Actions</p>
                  {stat_block.legendary_actions.map(action => (
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
});


