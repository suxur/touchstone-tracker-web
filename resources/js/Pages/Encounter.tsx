import * as React from 'react';
import { useCallback, useState } from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Sidebar } from '@/Layouts/Sidebar';
import { ScrollContent } from '@/Components/ScrollContent';
import { usePage } from '@inertiajs/inertia-react';
import { Page, PageProps } from '@inertiajs/inertia';
import { ListBody, ListHeader } from '@/Components/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EncounterProvider, Remove } from '@/Components/Encounter/EncounterProvider';
import { JetConfirmationModal } from '@/Components/Jetstream';
import { CombatantRow } from '@/Components/Encounter/CombatantRow';
import { Encounter, User } from '@/types';
import { EncounterLink } from '@/Components/EncounterLink';
import { ClearEncounterModal } from '@/Components/Encounter/ClearEncounterModal';

interface Props extends PageProps {
  auth: {
    user: User
  },
  encounter: Encounter
}

export default function Encounter() {
  const { auth, encounter } = usePage<Page<Props>>().props;
  const [remove, setRemove] = useState<Remove>({
    name: null,
    combatant: null,
    isOpen: false,
    isDeleting: false,
  });

  const [clearModalIsOpen, setClearModalIsOpen] = useState(false);

  const save = useCallback(() => {
    console.log('Saved!');
  }, []);

  const cancelDeleteRow = useCallback(() => {
    setRemove({ ...remove, combatant: null, isOpen: false, isDeleting: false });
  }, [remove, setRemove]);

  const removeCombatantConfirm = useCallback(async () => {
    setRemove({ ...remove, isDeleting: true, isOpen: false });
    // await removeCombatantConfirmAction({ combatant: remove.combatant });
    cancelDeleteRow();
    // const index = _.findIndex(this.encounters, e => e.id === this.delete_encounter.id);
    // this.encounters.splice(index, 1);
    // axios.post(route('encounter.destroy', {id: this.delete_encounter.id})).then(() => {
    //   vm.delete_encounter = null;
    // });
  }, [cancelDeleteRow, remove]);
  return (
    <AppLayout>
      <div className="h-full w-full flex flex-row">
        <Sidebar />
        <main className="w-full flex flex-row py-4 px-2">
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
                      <span>Round: <span className="font-bold text-gray-600">{encounter.round}</span></span>
                      // <span>Elapsed Time: <time-since className="font-bold text-gray-600" :date="encounter.started_at"></time-since></span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {!encounter.user_id && auth.user && (
                      <button className="button bg-purple-600" onClick={save}>
                        Save
                      </button>
                    )}
                    {/*<Settings encounter={encounter} />*/}
                  </div>
                </>
              )}
            </ScrollContent.Header>
            <ScrollContent.Body>
              <>
                <ListHeader>
                  <div className="col-span-1 flex justify-center items-center">
                    <FontAwesomeIcon icon="grip-lines" />
                  </div>
                  <div className="col-span-11 flex justify-between">
                    <div className="flex">Name</div>
                    <div className="flex space-x-2 md:space-x-4 mr-2 md:mr-4">
                      <div className="flex justify-center items-center w-28">HP</div>
                      <div className="flex justify-center items-center w-12">AC</div>
                      <div className="flex justify-center items-center w-12">Initiative</div>
                      {!encounter?.is_active && (
                        <div className="hidden sm:flex justify-center items-center w-12" />
                      )}
                    </div>
                  </div>
                </ListHeader>
                <ListBody className="mb-2 sm:mb-4">
                  <EncounterProvider value={{ remove, setRemove }}>
                    {encounter.combatants.length > 0 ? (
                      encounter.combatants.map(combatant => (
                        <CombatantRow
                          key={combatant.encounter_stats.unique_id}
                          active={encounter.is_active}
                          combatant={combatant}
                        />
                      ))) : (
                      <div className="col-span-12">
                        <p className="flex h-14 max-h-14 justify-between px-2 items-center">No combatants.</p>
                      </div>
                    )}

                    <JetConfirmationModal
                      isOpen={remove.isOpen}
                      onClose={cancelDeleteRow}
                    >
                      <JetConfirmationModal.Content
                        title="Remove Combatant?"
                      >
                        <p>Are you sure you want to remove the <strong>{remove?.name}</strong> combatant?</p>
                      </JetConfirmationModal.Content>
                      <JetConfirmationModal.Footer>
                        <button
                          className="button border-none bg-transparent hover:bg-gray-200 text-gray-500 mr-2"
                          onClick={cancelDeleteRow}
                        >Cancel
                        </button>
                        <button
                          className="button bg-red-600" onClick={removeCombatantConfirm}
                        >Remove
                        </button>
                      </JetConfirmationModal.Footer>
                    </JetConfirmationModal>

                    <ClearEncounterModal isOpen={clearModalIsOpen} onClose={() => setClearModalIsOpen(false)}/>


                  </EncounterProvider>
                </ListBody>
                {encounter.combatants.length > 0 && (
                  <div className="flex justify-end">
                    {!encounter.is_active && (
                      <>
                        <button className="button button-transparent mr-2" onClick={() => setClearModalIsOpen(true)}>
                          Clear
                        </button>
                        <button className="button button-primary">Start Encounter</button>
                      </>
                    )}
                  </div>
                )}
              </>
            </ScrollContent.Body>
          </ScrollContent>
        </main>
      </div>
    </AppLayout>
  );
}
