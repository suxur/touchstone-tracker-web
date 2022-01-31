import * as React from 'react';
import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StatBlock as SB } from '@/types';
import { StatLine } from '@/Components/StatBlock/StatLine';
import { ActionLine } from '@/Components/StatBlock/ActionLine';
import { Divider } from '@/Components/StatBlock/Divider';

interface Props {
  statBlock: SB;
}

export const StatBlock = forwardRef<HTMLButtonElement, Props>(({ statBlock }: Props, ref) => (
  <div
    className="bg-white rounded-md border-t-4 border-b-4 border-purple-400 h-full filter drop-shadow flex flex-grow overflow-hidden flex-col absolute inset-0 z-20"
  >
    <div className="relative px-4 pt-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-bold">{statBlock.name}</p>
        <button
          ref={ref}
          className="relative rounded-full flex flex-shrink-0 justify-center items-center bg-red-200 text-red-400 h-6 w-6"
        >
          <FontAwesomeIcon icon="times" className="stat-block-close" />
        </button>
      </div>
      {statBlock.size && statBlock.alignment && (
        <p className="italic">{statBlock.size}, {statBlock.alignment}</p>
      )}
    </div>
    <Divider />
    <div className="flex flex-col overflow-auto relative h-full">
      <div className="absolute inset-0">
        <div className="p-4 pt-0">
          <StatLine title="Armor Class" stat={statBlock.armor_class} />
          <StatLine title="Hit Points" stat={statBlock.hit_points} />
          <StatLine title="Speed" stat={statBlock.speed} />
          <Divider />
          <div className="flex flex-row justify-around">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">STR</p>
              <p>{statBlock.strength} ({statBlock.strength_modifier})</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">DEX</p>
              <p>{statBlock.dexterity} ({statBlock.dexterity_modifier})</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">CON</p>
              <p>{statBlock.constitution} ({statBlock.constitution_modifier})</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">INT</p>
              <p>{statBlock.intelligence} ({statBlock.intelligence_modifier})</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">WIS</p>
              <p>{statBlock.wisdom} ({statBlock.wisdom_modifier})</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">CHA</p>
              <p>{statBlock.charisma} ({statBlock.charisma_modifier})</p>
            </div>
          </div>
          <Divider />
          <StatLine title="Damage Vulnerabilities" stat={statBlock.damage_vulnerabilities} />
          <StatLine title="Damage Resistances" stat={statBlock.damage_resistances} />
          <StatLine title="Damage Immunities" stat={statBlock.damage_immunities} />
          <StatLine title="Condition Immunities" stat={statBlock.condition_immunities} />
          <StatLine title="Senses" stat={statBlock.senses} />
          <div className="flex-row">
            <StatLine title="Challenge" stat={statBlock.challenge_rating} />
            <p> ({statBlock.experience_points} XP)</p>
          </div>
          {statBlock.special_abilities.length > 0 && (
            <>
              <Divider />
              {statBlock.special_abilities.map(action => (
                <ActionLine key={action.id} action={action} />
              ))}
            </>
          )}
          {statBlock.actions.length > 0 && (
            <>
              <p className="text-lg underline">Actions</p>
              {statBlock.actions.map(action => (
                <ActionLine key={action.id} action={action} />
              ))}
            </>
          )}
          {statBlock.reactions.length > 0 && (
            <>
              <p className="text-lg underline">Reactions</p>
              {statBlock.reactions.map(action => (
                <ActionLine key={action.id} action={action} />
              ))}
            </>
          )}
          {statBlock.legendary_actions.length > 0 && (
            <>
              <p className="text-lg underline">Legendary Actions</p>
              {statBlock.legendary_actions.map(action => (
                <ActionLine key={action.id} action={action} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
));
