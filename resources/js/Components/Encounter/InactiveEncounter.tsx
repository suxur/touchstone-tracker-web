import * as React from 'react';

import { hasType } from '@/lib/helpers';
import { ListBody, ListHeader } from '@/Components/List';
import { InactiveCombatantRow } from '@/Components/Encounter/InactiveCombatantRow';
import { useEncounter } from '@/Hooks/useEncounter';
import { useMemo } from 'react';

export const InactiveEncounter = () => {
  const { encounter } = useEncounter();

  const hasNoCombatant = useMemo(
    () => encounter.combatants.length === 0,
    [encounter.combatants.length],
  );
  const hasCharacters = useMemo(
    () => hasType(encounter.combatants, 'character'),
    [encounter.combatants],
  );
  const hasMonsters = useMemo(
    () => hasType(encounter.combatants, 'monster'),
    [encounter.combatants],
  );

  if (encounter) {
    return (
      <>
        {hasNoCombatant && (
          <ListBody className="mb-2 sm:mb-4">
            <div className="rounded-md bg-white flex flex-col flex-grow justify-center items-center py-10">
              <div className="rounded-full h-28 w-28 border-4 border-purple-700 bg-gray-100 justify-center items-center flex mb-10">
                <i className="icon-encounters text-7xl text-purple-700" />
              </div>
              <h3 className="font-bold text-2xl">Let's Battle!</h3>
              <p className="text-center mb-4 mx-8">
                You can't have an encounter without combatants. Add a monster or
                character from the codex to get started.
              </p>
            </div>
          </ListBody>
        )}
        {hasCharacters && (
          <>
            <ListHeader>
              <div className="flex justify-center items-center px-2">
                Characters
              </div>
            </ListHeader>
            <ListBody className="mb-2 sm:mb-4">
              {encounter.combatants
                ?.filter((c) => c.type === 'character')
                .map((combatant) => (
                  <InactiveCombatantRow
                    key={combatant.id}
                    combatant={combatant}
                  />
                ))}
            </ListBody>
          </>
        )}
        {hasMonsters && (
          <>
            <ListHeader>
              <div className="flex justify-center items-center px-2">
                Monsters
              </div>
            </ListHeader>
            <ListBody className="mb-2 sm:mb-4">
              {encounter.combatants
                ?.filter((c) => c.type === 'monster')
                .map((combatant) => (
                  <InactiveCombatantRow
                    key={combatant.id}
                    combatant={combatant}
                  />
                ))}
            </ListBody>
          </>
        )}
      </>
    );
  }

  return null;
};
