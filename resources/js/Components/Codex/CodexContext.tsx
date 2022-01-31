import * as React from 'react';
import produce from 'immer';
import { createContext, useMemo } from 'react';

export interface StatBlock {
  id: number;
}

export interface SpellBlock {
  id: number;
}

type Action =
  | { type: 'open_stat_block', id: number }
  | { type: 'close_stat_block', id: number }
  | { type: 'open_spell_block', id: number }
  | { type: 'close_spell_block', id: number }

type Dispatch = (action: Action) => void

type State = {
  stat_blocks: StatBlock[],
  spell_blocks: SpellBlock[],
}

type CodexProviderProps = { children: React.ReactNode }

const CodexStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const codexReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'open_stat_block': {
      return produce(state, draftState => {
        const statBlock = draftState.stat_blocks.find(sb => sb.id === action.id);
        if (!statBlock) {
          draftState.stat_blocks.push({ id: action.id });
        }
      });
    }
    case 'close_stat_block':
      return produce(state, draftState => {
        const index = draftState.stat_blocks.findIndex(sb => sb.id === action.id);
        draftState.stat_blocks.splice(index, 1);
      });
    case 'open_spell_block': {
      return produce(state, draftState => {
        const spellBlock = draftState.spell_blocks.find(sb => sb.id === action.id);
        if (!spellBlock) {
          draftState.spell_blocks.push({ id: action.id });
        }
      });
    }
    case 'close_spell_block':
      return produce(state, draftState => {
        const index = draftState.spell_blocks.findIndex(sb => sb.id === action.id);
        draftState.spell_blocks.splice(index, 1);
      });
    default:
      return state;
  }
};

const CodexProvider = ({ children }: CodexProviderProps) => {
  const [state, dispatch] = React.useReducer(codexReducer, { stat_blocks: [], spell_blocks: [] });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <CodexStateContext.Provider value={value}>
      {children}
    </CodexStateContext.Provider>
  );
};

const useCodex = () => {
  const context = React.useContext(CodexStateContext);
  if (context === undefined) {
    throw new Error('useCodex must be used within a CodexProvider');
  }
  return context;
};

export { CodexProvider, useCodex };
