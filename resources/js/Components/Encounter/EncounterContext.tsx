// import * as React from 'react';
// import produce from 'immer';
// import { Encounter } from '@/types';
// import { createContext, useContext, useReducer } from 'react';
//
//
// type Action =
//   | { type: 'open_stat_block', id: number }
//   | { type: 'close_stat_block', id: number }
//   | { type: 'open_spell_block', id: number }
//   | { type: 'close_spell_block', id: number }
//
// type Dispatch = (action: Action) => void
//
// type State = {
//   encounter: Encounter
// }
//
// type EncounterProviderProps = { children: React.ReactNode }
//
// const EncounterStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);
//
// const encounterReducer = (state: State, action: Action) => {
//   switch (action.type) {
//   }
// };
//
// const EncounterProvider = ({ children }: EncounterProviderProps) => {
//   const [state, dispatch] = useReducer(encounterReducer, { encounter: {} });
//   // NOTE: you *might* need to memoize this value
//   // Learn more in http://kcd.im/optimize-context
//   const value = { state, dispatch };
//   return (
//     <EncounterStateContext.Provider value={value}>
//       {children}
//     </EncounterStateContext.Provider>
//   );
// };
//
// const useEncounter = () => {
//   const context = useContext(EncounterStateContext);
//   if (context === undefined) {
//     throw new Error('useEncounter must be used within a EncounterProvider');
//   }
//   return context;
// };
//
// export { EncounterProvider, useEncounter };