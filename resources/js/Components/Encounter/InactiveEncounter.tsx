import * as React from 'react';

import { hasType } from '@/lib/helpers';
import { ListBody, ListHeader } from '@/Components/List';
import { InactiveCombatantRow } from '@/Components/Encounter/InactiveCombatantRow';
import { useEncounter } from '@/Hooks/useEncounter';
import { useMemo } from 'react';

export const InactiveEncounter = () => {
  const { encounter } = useEncounter();
  const hasCharacters = useMemo(() => hasType(encounter.combatants, 'character'), [encounter.combatants]);
  const hasMonsters = useMemo(() => hasType(encounter.combatants, 'monster'), [encounter.combatants]);

  if (encounter) {
    return (
      <>
        <ListHeader>
          <div className="flex justify-center items-center px-2">Characters</div>
        </ListHeader>
        <ListBody className="mb-2 sm:mb-4">
          {hasCharacters
            ? encounter.combatants?.filter((c) => c.type === 'character').map(combatant => (
              <InactiveCombatantRow key={combatant.id} combatant={combatant} />
            )) : (
              <p className="flex h-14 max-h-14 justify-between px-2 items-center">No character combatants.</p>
            )}
        </ListBody>
        <ListHeader>
          <div className="flex justify-center items-center px-2">Monsters</div>
        </ListHeader>
        <ListBody className="mb-2 sm:mb-4">
          {hasMonsters
            ? encounter.combatants?.filter((c) => c.type === 'monster').map(combatant => (
              <InactiveCombatantRow key={combatant.id} combatant={combatant} />
            )) : (
              <p className="flex h-14 max-h-14 justify-between px-2 items-center">No monster combatants.</p>
            )}
        </ListBody>
      </>
    );
  }

  return null;
};
