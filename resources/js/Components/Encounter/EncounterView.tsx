import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollContent } from '@/Components/ScrollContent';
import { EncounterLink } from '@/Components/EncounterLink';
import { TimeSince } from '@/Components/TimeSince';
import { ListBody, ListHeader } from '@/Components/List';
import { InactiveCombatantRow } from '@/Components/Encounter/InactiveCombatantRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CombatantRow } from '@/Components/Encounter/CombatantRow';
import { StartButton } from '@/Components/Encounter/StartButton';
import { NextButton } from '@/Components/Encounter/NextButton';
import { DeleteCombatantModal } from '@/Components/Modals/DeleteCombatantModal';
import { ClearEncounterModal } from '@/Components/Encounter/ClearEncounterModal';
import { Combatant, Encounter, User } from '@/types';
import { EndEncounterModal } from '@/Components/Encounter/EndEncounterModal';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useForm } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';
import axios from 'axios';
import { orderBy } from 'lodash';
import { reorder } from '@/lib/helpers';

interface Props {
  user: User;
  encounter: Encounter;
}

type Remove = {
  isOpen: boolean;
  combatant?: Combatant;
  type?: 'monster' | 'character';
}

export const EncounterView = ({ encounter }: Props) => {
  const route = useRoute();
  const [combatants, setCombatants] = useState<Combatant[]>(encounter.combatants);

  useEffect(() => {
    if (encounter.is_active) {
      console.log('Sorting...');
      setCombatants(orderBy(encounter.combatants, ['initiative'], ['desc']));
    }
  }, [encounter.is_active]);

  useEffect(() => {
    setCombatants(encounter.combatants);
  }, [encounter]);

  const form = useForm({
    combatants: encounter.combatants.map(c => c.id)
  });

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log('Saving Combatants');
    // form.post(route('encounters.update', { encounter }));
    axios.post(route('encounters.update', { encounter }), {
      combatants: combatants.map(c => c.id)
    });
  }, [combatants]);

  const [remove, setRemove] = useState<Remove>({
    isOpen: false,
  });

  const start = useMemo(() => encounter.started_at, [encounter.started_at]);

  const [clearModalIsOpen, setClearModalIsOpen] = useState(false);
  const [endModalIsOpen, setEndModalIsOpen] = useState(false);

  const cancelDeleteRow = useCallback(() => {
    setRemove({ ...remove, isOpen: false });
  }, [remove, setRemove]);

  const hasCharacters = () => {
    return encounter.combatants.filter(c => c.type === 'character').length > 0;
  };

  const hasMonsters = () => {
    return encounter.combatants.filter(c => c.type === 'monster').length > 0;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const reorderedCombatants = reorder<Combatant>(combatants, source.index, destination.index);
    setCombatants(reorderedCombatants);
    form.setData({ combatants: reorderedCombatants.map(c => c.id) });
  };

  return (
    <>
      <ScrollContent>
        <ScrollContent.Header>
          {encounter && (
            <>
              <div className="flex flex-col mb-2 md:mb-0 md:flex-row md:space-x-4">
                <div>
                  Encounter:
                  <EncounterLink slug={encounter.slug} />
                </div>
                {encounter.is_active && (
                  <>
                    <span>Round: <span className="font-bold text-gray-600">{encounter.round}</span></span>
                    <span>Elapsed Time: <TimeSince date={start} /></span>
                  </>
                )}
              </div>
              <div className="flex items-center">
                {/*<Settings encounter={encounter} />*/}
              </div>
            </>
          )}
        </ScrollContent.Header>
        <ScrollContent.Body>
          <>
            {!encounter.is_active && encounter.combatants.length === 0 && (
              <ListBody>
                <p className="flex h-14 max-h-14 justify-between px-2 items-center">No combatants.</p>
              </ListBody>
            )}
            {!encounter.is_active && hasCharacters() && (
              <>
                <ListHeader>
                  <div className="flex justify-center items-center px-2">Characters</div>
                </ListHeader>
                <ListBody className="mb-2 sm:mb-4">
                  <>
                    {encounter.combatants.filter(c => c.type === 'character').map((combatant, i) => (
                      <InactiveCombatantRow
                        key={combatant.id}
                        combatant={combatant}
                        onDelete={() => setRemove({ ...remove, isOpen: true, combatant, type: 'monster' })}
                      />
                    ))}
                  </>
                </ListBody>
              </>
            )}
            {!encounter.is_active && hasMonsters() && (
              <>
                <ListHeader>
                  <div className="flex justify-center items-center px-2">Monsters</div>
                </ListHeader>
                <ListBody className="mb-2 sm:mb-4">
                  <>
                    {encounter.combatants.filter(c => c.type === 'monster').map((combatant, i) => (
                      <InactiveCombatantRow
                        key={combatant.id}
                        combatant={combatant}
                        onDelete={() => setRemove({ ...remove, isOpen: true, combatant, type: 'monster' })}
                      />
                    ))}
                  </>
                </ListBody>
              </>
            )}
            {encounter.is_active && encounter.combatants.length > 0 && (
              <>
                <ListHeader>
                  <div className="flex w-10 justify-center items-center cursor-move handle px-2">
                    <FontAwesomeIcon icon="grip-lines" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-row flex-grow justify-between space-x-2 md:space-x-4">
                      <div className="flex flex-grow items-center ml-2 md:ml-4">Name</div>
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
                      {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="divide-y divide-gray-200">
                          {encounter.combatants.map((combatant, i) => (
                            <Draggable draggableId={combatant.id.toString()} index={i} key={combatant.id}>
                              {provided => (
                                <CombatantRow
                                  ref={provided.innerRef}
                                  key={combatant.id}
                                  active={encounter.is_active && encounter.active_index === i}
                                  combatant={combatant}
                                  encounter={encounter}
                                  draggableProps={provided.draggableProps}
                                  dragHandleProps={provided.dragHandleProps}
                                />
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </ListBody>
              </>
            )}
            {encounter.combatants.length > 0 && (
              <div className="flex justify-end">
                {!encounter.is_active ? (
                  <>
                    <button className="button button-transparent mr-2" onClick={() => setClearModalIsOpen(true)}>
                      Clear
                    </button>
                    <StartButton />
                  </>
                ) : (
                  <>
                    <JetTransparentButton className="mr-2" onClick={() => setEndModalIsOpen(true)}>End
                      Encounter
                    </JetTransparentButton>
                    <NextButton />
                  </>
                )}
              </div>
            )}
          </>
        </ScrollContent.Body>
      </ScrollContent>
      <DeleteCombatantModal combatant={remove.combatant} isOpen={remove.isOpen} onClose={cancelDeleteRow} />
      <ClearEncounterModal isOpen={clearModalIsOpen} onClose={() => setClearModalIsOpen(false)} />
      <EndEncounterModal isOpen={endModalIsOpen} onClose={() => setEndModalIsOpen(false)} />
    </>
  );
};