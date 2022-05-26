import * as React from 'react';
import { ScrollContent } from '@/Components/ScrollContent';
import { EncounterLink } from '@/Components/EncounterLink';
import { TimeSince } from '@/Components/TimeSince';
import { StartButton } from '@/Components/Encounter/StartButton';
import { NextButton } from '@/Components/Encounter/NextButton';
import { ClearEncounterModal } from '@/Components/Encounter/ClearEncounterModal';
import { EndEncounterModal } from '@/Components/Encounter/EndEncounterModal';
import { useEncounter } from '@/Hooks/useEncounter';
import { ActiveEncounter } from '@/Components/Encounter/ActiveEncounter';
import { InactiveEncounter } from '@/Components/Encounter/InactiveEncounter';
import { GameTime } from '@/Components/GameTime';
import { RollAllButton } from './RollAllButton';

export const EncounterView = () => {
  const { encounter } = useEncounter();

  if (!encounter) return null;

  return (
    <ScrollContent>
      <ScrollContent.Header>
        <>
          <div className="flex flex-col mb-2 md:mb-0 md:flex-row md:space-x-4">
            <div>
              Encounter:
              <EncounterLink slug={encounter.slug} />
            </div>
            {encounter.is_active && (
              <>
                <div>
                  <span className="mr-1">Round:</span>
                  <span className="font-bold text-gray-600">
                    {encounter.round}
                  </span>
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
          {/* <div className="flex items-center"> */}
          {/*  <Settings encounter={encounter} /> */}
          {/* </div> */}
        </>
      </ScrollContent.Header>
      <ScrollContent.Body>
        <>
          {!encounter.is_active ? <InactiveEncounter /> : <ActiveEncounter />}
          {encounter.combatants.length > 0 && (
            <div className="flex justify-between">
              {!encounter.is_active ? (
                <>
                  <RollAllButton />
                  <div>
                    <ClearEncounterModal />
                    <StartButton />
                  </div>
                </>
              ) : (
                <>
                  <EndEncounterModal />
                  <NextButton />
                </>
              )}
            </div>
          )}
        </>
      </ScrollContent.Body>
    </ScrollContent>
  );
};
