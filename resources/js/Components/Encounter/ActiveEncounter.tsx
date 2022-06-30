import * as React from "react";
import { useEffect, useState } from "react";
import { orderBy } from "lodash";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Combatant } from "@/types";
import { reorder } from "@/lib/helpers";
import { useEncounter } from "@/Hooks/useEncounter";
import { ListBody, ListHeader } from "@/Components/List";
import { CombatantRow } from "@/Components/Encounter/CombatantRow";

export const ActiveEncounter = () => {

  const { encounter, updateCombatantsOrder } = useEncounter();
  const [orderedCombatants, setOrderedCombatants] = useState<Combatant[]>([]);

  useEffect(() => {
    setOrderedCombatants(orderBy(encounter.combatants, ["order"]));
  }, [encounter.combatants]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const reorderedCombatants = reorder<Combatant>(
      encounter?.combatants || [],
      source.index,
      destination.index
    ).map((c, i) => ({ ...c, order: i }));
    updateCombatantsOrder.mutate(reorderedCombatants);
    setOrderedCombatants(reorderedCombatants);
  };

  if (encounter) {
    return (
      <>
        <ListHeader>
          <div className="flex w-10 justify-center items-center cursor-move handle px-2">
            <FontAwesomeIcon icon="grip-lines" />
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex flex-row flex-grow justify-between space-x-2 md:space-x-4">
              <div className="flex flex-grow items-center ml-2 md:ml-4">
                Name
              </div>
              <div className="flex space-x-2 md:space-x-4 mr-2 md:mr-4">
                <div className="flex justify-center items-center w-28">HP</div>
                <div className="flex justify-center items-center w-12">AC</div>
              </div>
            </div>
          </div>
        </ListHeader>
        <ListBody className="mb-2 sm:mb-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={encounter.slug}>
              {(dropProvided, snapshot) => (
                <div
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                  className="divide-y divide-gray-200"
                >
                  {orderedCombatants.map((combatant, i) => (
                    <Draggable
                      draggableId={combatant.id.toString()}
                      index={i}
                      key={combatant.id}
                    >
                      {(dragProvided) => (
                        <CombatantRow
                          ref={dragProvided.innerRef}
                          key={combatant.id}
                          active={
                            encounter.is_active &&
                            encounter.active_index === i &&
                            !snapshot.isDraggingOver
                          }
                          combatant={combatant}
                          encounter={encounter}
                          draggableProps={dragProvided.draggableProps}
                          dragHandleProps={dragProvided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ListBody>
      </>
    );
  }

  return null;
};
