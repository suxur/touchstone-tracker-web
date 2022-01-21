import * as React from 'react';
import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CodexMonster, Combatant, SetAction } from '@/types';
import { noop } from '@/lib/helpers';
import { routes } from '@/constants';
import { QuickAdd } from '@/Components/Codex/QuickAdd';
import { NoResults } from '@/Components/Codex/NoResults';
import { MonsterRow } from '@/Components/Codex/Monsters/MonsterRow';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { SearchInput } from '@/Components/Codex/SearchInput';
import { CreateStatBlockForm } from '@/Components/Modals/CreateStatBlockForm';

interface StatBlock {
  id: number;
  showing: boolean;
  combatant: Combatant;
}

interface Context {
  statBlocks: StatBlock[];
  setStatBlocks: SetAction<StatBlock[]>;
}

const MonstersContext = createContext<Context>({
  statBlocks: [],
  setStatBlocks: noop
});

export const MonstersTab = () => {
  const [query, setQuery] = useState('');
  const [statBlocks, setStatBlocks] = useState<StatBlock[]>([]);
  const [createMonsterModal, setCreateMonsterModal] = useState({
    isOpen: false
  });

  const { data, isFetched } = useQuery<CodexMonster[]>(routes.CODEX_MONSTERS, {
    initialData: []
  });

  const filtered = data?.filter(combatant => {
    const regex = new RegExp(query, 'gi');
    return combatant.name.match(regex);
  });

  const renderContent = () => {
    if (isFetched && filtered && filtered.length === 0) {
      return <NoResults />;
    }

    if (filtered) {
      return (
        <>
          {filtered?.map(monster => (
            <MonsterRow key={monster.id} monster={monster} highlight={query} />
          ))}
        </>
      );
    }

    return <div className="h-32 loading-dark" />;
  };

  return (
    <MonstersContext.Provider
      value={{
        statBlocks,
        setStatBlocks
      }}
    >
      <SearchInput query={query} setQuery={setQuery} />
      <div className="p-2 bg-white border-b border-gray-200">
        <QuickAdd type="monster" />
      </div>
      <div className="overflow-auto rounded-b-md flex-grow bg-white">
        {renderContent()}
      </div>
      <JetTransparentButton
        type="button"
        className="w-full mt-2"
        onClick={() => setCreateMonsterModal({ isOpen: true })}
      >
        <FontAwesomeIcon icon="plus" />
        <span className="ml-2">New Monster</span>
      </JetTransparentButton>
      <CreateStatBlockForm
        isOpen={createMonsterModal.isOpen}
        onClose={() => setCreateMonsterModal({ isOpen: false })}
        type="monster"
      />
    </MonstersContext.Provider>
  );
};
