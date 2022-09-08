import * as React from "react";
import { AxiosResponse } from "axios";
import { UseMutationResult } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Combatant } from "@/types";
import { InlineInput } from "@/Components/InlineInput";
import { DeleteCombatantModal } from "@/Components/Modals/DeleteCombatantModal";
import { roll } from "@/Dice";
import { useCombatant } from "@/Hooks/useCombatant";
import { useEncounter } from "@/Hooks/useEncounter";
import { useCodex } from "../Codex/CodexContext";
import { Button } from '@/Components/Button';

type Props = {
  combatant: Combatant;
};

export const InactiveCombatantRow = ({ combatant }: Props) => {
  const { removeCombatant } = useEncounter();
  const { mutation } = useCombatant(combatant);
  const { dispatch } = useCodex();

  const update = (newData: Combatant) => {
    mutation.mutate(newData);
  };

  const onViewClick = () => {
    if (combatant?.stat_block?.id) {
      dispatch({ type: "open_stat_block", id: combatant.stat_block.id });
    }
  }

  return (
    <InactiveCombatantRowComponent
      combatant={combatant}
      update={update}
      view={onViewClick}
      destroyMutation={removeCombatant}
    />
  );
};

type ComponentProps = {
  combatant: Combatant;
  update: (combatant: Combatant) => void;
  destroyMutation: UseMutationResult<
    AxiosResponse<any>,
    unknown,
    number,
    unknown
  >;
  view: () => void;
};

export const InactiveCombatantRowComponent = ({
  combatant,
  update,
  destroyMutation,
  view,
}: ComponentProps) => (
  <div className="bg-white border-b border-gray-200 p-2">
    <div className="flex flex-row">
      <div>
        <div className="bg-gray-600 rounded aspect-square w-full text-white flex justify-center items-center font-bold text-lg mb-1">
          <InlineInput
            value={combatant.initiative}
            onDone={(v) => update({ ...combatant, initiative: Number(v) })}
            shouldHighlight
          />
        </div>
        <Button
          bg="transparent"
          onClick={() =>
            update({
              ...combatant,
              initiative: roll(`d20+${combatant.stat_block?.initiative || 0}`),
            })
          }
        >
          Roll
        </Button>
      </div>
      <div className="ml-4 flex flex-row justify-between w-full">
        <div className="w-full">
          <span
            className="font-medium text-xl mb-2 text-purple-600"
            onClick={view}
          >
            {combatant.name}
          </span>
          <div className="flex flex-row w-full">
            <div className="flex flex-col">
              <div className="mr-4 flex items-center">
                <FontAwesomeIcon className="text-gray-500 mr-1" icon="heart" />
                <InlineInput
                  value={combatant.current_hit_points}
                  className="text-2xl font-bold"
                  onDone={(v) =>
                    update({
                      ...combatant,
                      current_hit_points: Number(v),
                      hit_point_maximum: Number(v),
                    })
                  }
                />
              </div>
              {combatant.stat_block?.challenge_rating && (
                <div className="mr-4">
                  <span className="text-sm text-gray-500 mr-1">CR</span>
                  <span className="font-bold">
                    {combatant.stat_block?.challenge_rating}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-gray-500 mr-1"
                  icon="shield-alt"
                />
                <InlineInput
                  value={combatant.armor_class}
                  className="text-2xl font-bold"
                  onDone={(v) =>
                    update({ ...combatant, armor_class: Number(v) })
                  }
                  shouldHighlight
                />
              </div>
              {combatant.stat_block?.experience_points ? (
                <div>
                  <span className="text-sm text-gray-500 mr-1">XP</span>
                  <span className="font-bold">
                    {combatant.stat_block?.experience_points}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <DeleteCombatantModal
            combatant={combatant}
            mutation={destroyMutation}
          />
        </div>
      </div>
    </div>
  </div>
);
