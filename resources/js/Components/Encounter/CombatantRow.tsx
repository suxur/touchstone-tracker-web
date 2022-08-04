import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import * as React from "react";
import { forwardRef, useCallback, useMemo } from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

import { DeathSaves } from "@/Components/Combatant/DeathSaves";
import { Actions } from "@/Components/Encounter/Actions";
import { InlineInput } from "@/Components/InlineInput";
import { COMBATANT_MONSTER } from "@/constants";
import { useCombatant } from "@/Hooks/useCombatant";
import { Combatant, Encounter } from "@/types";
import { ConditionDropdown } from "../Combatant/ConditionDropdown";
import { useConditions } from "@/Hooks/useConditions";

interface Props {
  active: boolean;
  combatant: Combatant;
  encounter: Encounter;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
}

export const CombatantRow = forwardRef<HTMLDivElement, Props>(
  (
    { active, combatant, encounter, draggableProps, dragHandleProps }: Props,
    ref
  ) => {
    const { mutation } = useCombatant(combatant);
    const { conditions } = useConditions();

    const showStatBlock = useCallback(() => {}, []);

    const update = (newData: Combatant) => {
      mutation.mutate(newData);
    };

    // return (data.encounter_stats.combatant_type === COMBATANT_CHARACTER) || data.team_id !== null;
    const isEditable = useMemo(() => true, []);
    const isDefeated = useMemo(
      () => combatant.current_hit_points === 0,
      [combatant]
    );
    const isMonster = useMemo(
      () => combatant.type === COMBATANT_MONSTER,
      [combatant]
    );

    return (
      <div
        ref={ref}
        className={clsx(
          "flex",
          active ? "bg-purple-300" : "odd:bg-white even:bg-gray-50"
        )}
        {...draggableProps}
      >
        <div
          className={clsx(
            "flex w-10 shrink-0 justify-center items-center cursor-grab handle border-r px-2",
            { "bg-purple-400 border-purple-400": active }
          )}
          {...dragHandleProps}
        >
          <FontAwesomeIcon icon="grip-lines" />
        </div>
        <div className="flex flex-col flex-grow">
          <div
            className={clsx(
              "flex flex-row flex-grow h-12 max-h-12 mt-2 justify-between space-x-2 md:space-x-4",
              { "font-bold": active }
            )}
          >
            <div
              className="flex flex-grow items-center cursor-pointer ml-2 md:ml-4"
              onClick={showStatBlock}
            >
              <div
                className={clsx(
                  "h-12 w-12 rounded-md flex items-center justify-center bg-gray-100 mr-2",
                  { "bg-purple-400": active }
                )}
              >
                <InlineInput value={combatant.initiative} editable={false} />
              </div>
              {combatant.name}
            </div>
            <div className="flex space-x-2 md:space-x-4 mr-2 md:mr-4">
              <div className="flex justify-center items-center w-28">
                <InlineInput
                  value={combatant.current_hit_points}
                  max={combatant.hit_point_maximum}
                  onDone={(v) =>
                    update({ ...combatant, current_hit_points: Number(v) })
                  }
                  shouldHighlight
                />
                /
                <InlineInput
                  value={combatant.hit_point_maximum}
                  editable={isEditable}
                  onDone={(v) =>
                    update({ ...combatant, hit_point_maximum: Number(v) })
                  }
                />
              </div>
              <div className="flex justify-center items-center w-12">
                <InlineInput
                  value={combatant.armor_class}
                  editable={isEditable}
                  onDone={(v) =>
                    update({ ...combatant, armor_class: Number(v) })
                  }
                  shouldHighlight
                />
              </div>
            </div>
          </div>
          {encounter.is_active && (
            <div className="flex py-2 px-4">
              {!isDefeated && (
                <div>
                  <Actions active={active} combatant={combatant} />
                  <div className="mt-1">
                    <ConditionDropdown
                      combatant={combatant}
                      conditions={conditions}
                      active={active}
                    />
                  </div>
                </div>
              )}
              {isDefeated && !isMonster && (
                <DeathSaves active={active} combatant={combatant} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
