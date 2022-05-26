import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { ScrollContent } from '@/Components/ScrollContent';
import { EncounterLink } from '@/Components/EncounterLink';
import { TimeSince } from '@/Components/TimeSince';
import { useEncounter } from '@/Hooks/useEncounter';
import { ListBody, ListHeader } from '@/Components/List';
import { CombatantRow } from '@/Components/Player/CombatantRow';
import { useEncounterSubscription } from '@/Hooks/useEncounterSubscription';
import { GameTime } from '@/Components/GameTime';

const Show = () => {
  useEncounterSubscription();
  const { encounter } = useEncounter();

  return (
    <AppLayout>
      <div className="h-full w-full flex flex-row">
        <main className="w-full flex flex-row py-8 px-4">
          <ScrollContent>
            <ScrollContent.Header>
              <div className="flex flex-col mb-2 md:mb-0 md:flex-row md:space-x-4">
                <div>
                  Encounter:
                  <EncounterLink slug={encounter.slug} />
                </div>
                {encounter.is_active && (
                  <>
                    <div>
                      <span className="mr-1">Round:</span>
                      <span className="font-bold text-gray-600">{encounter.round}</span>
                    </div>
                    <div>
                      <span className="mr-1">Game Time:</span>
                      <GameTime rounds={encounter.round} />
                    </div>
                    <div>
                      <span className="mr-1">Elapsed Time:</span>
                      <TimeSince date={encounter.started_at} />
                    </div>
                  </>
                )}
              </div>
            </ScrollContent.Header>
            <ScrollContent.Body>
              <>
                <ListHeader>
                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-row flex-grow justify-between space-x-2 md:space-x-4">
                      <div className="flex flex-grow items-center ml-2 md:ml-4">Name</div>
                    </div>
                  </div>
                </ListHeader>
                <ListBody className="mb-2 sm:mb-4">
                  <div
                    className="divide-y divide-gray-200"
                  >
                    {encounter.combatants.map((combatant, i) => (
                      <CombatantRow
                        key={combatant.id}
                        active={encounter.is_active && encounter.active_index === i}
                        combatant={combatant}
                        encounter={encounter}
                      />
                    ))}
                  </div>
                </ListBody>
              </>
            </ScrollContent.Body>
          </ScrollContent>
        </main>
      </div>
    </AppLayout>
  );
};

export default Show;
