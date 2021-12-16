import { createContext } from 'react';
import { Combatant, SetAction } from '@/types';
import { noop } from '@/lib/helpers';

export interface Remove {
  name: string | null;
  combatant: Combatant | null;
  isOpen: boolean;
  isDeleting: boolean;
}

interface Context {
  remove: Remove;
  setRemove: SetAction<Remove>;
}

export const EncounterContext = createContext<Context>({
  remove: {
    name: null,
    combatant: null,
    isOpen: false,
    isDeleting: false,
  },
  setRemove: noop,
});

export const EncounterProvider = EncounterContext.Provider;
