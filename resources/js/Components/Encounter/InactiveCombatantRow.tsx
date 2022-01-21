import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Combatant } from '@/types';

import { roll } from '@/Dice';
import { useUpdateCombatant } from '@/Hooks/useUpdateCombatant';
import { JetButton } from '@/Components/Jetstream';
import { DeleteButton } from '@/Components/Button/DeleteButton';
import { InlineInput } from '@/Components/InlineInput';

type Props = {
  combatant: Combatant
  onDelete(): void
};

export const InactiveCombatantRow = ({ combatant, onDelete }: Props) => {
  const { data, update } = useUpdateCombatant(combatant);

  return (
    <div className="bg-white border-b border-gray-200 p-2">
      <div className="flex flex-row">
        <div>
          <div className="bg-gray-600 rounded h-12 w-full text-white flex justify-center items-center font-bold text-lg mb-1">
            <InlineInput
              value={data.initiative}
              onDone={v => update({ ...data, initiative: parseInt(v) })}
              shouldHighlight
            />
          </div>
          <JetButton
            bg="transparent"
            onClick={() => update({ ...data, initiative: roll(`d20+${data.stat_block?.initiative || 0}`) })}
          >
            Roll
          </JetButton>
        </div>
        <div className="ml-4 flex flex-row justify-between w-full">
          <div className="w-full">
            <span className="font-medium text-xl mb-2 text-purple-600">{data.name}</span>
            <div className="flex flex-row w-full">
              <div className="flex flex-col">
                <div className="mr-4 flex items-center">
                  <FontAwesomeIcon className="text-gray-500 mr-1" icon="heart" />
                  <InlineInput
                    value={data.current_hit_points}
                    className="text-xl font-bold"
                    onDone={v => update({ ...data, current_hit_points: parseInt(v), hit_point_maximum: parseInt(v) })}
                  />
                </div>
                {data.stat_block?.challenge_rating && (
                  <div className="mr-4">
                    <span className="text-sm text-gray-500 mr-1">CR</span>
                    <span className="font-bold">{data.stat_block?.challenge_rating}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <FontAwesomeIcon className="text-gray-500 mr-1" icon="shield-alt" />
                  <InlineInput
                    value={data.armor_class}
                    className="text-xl font-bold"
                    onDone={v => update({ ...data, armor_class: parseInt(v) })}
                    shouldHighlight
                  />
                </div>
                {data.stat_block?.experience_points && (
                  <div>
                    <span className="text-sm text-gray-500 mr-1">XP</span>
                    <span className="font-bold">{data.stat_block?.experience_points}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <DeleteButton onClick={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};