import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { CodexSpell, Spell } from '@/types';
import { routes } from '@/constants';
import { CodexRow } from '@/Components/Codex/CodexRow';
import { NoResults } from '@/Components/Codex/NoResults';
import { useCodex } from '@/Components/Codex/CodexContext';
import { SearchInput } from '@/Components/Codex/SearchInput';

export const getSpell = async (id: number | null) => {
  const { data } = await axios.get<Spell>(`/api/spell/${id}`);
  return data;
};

export const SpellsTab = () => {
  const { dispatch } = useCodex();
  const [query, setQuery] = useState('');

  const { isFetched, data } = useQuery<CodexSpell[]>(routes.CODEX_SPELLS);

  const filtered = data?.filter(spell => spell.name.toLowerCase().indexOf(query.toLowerCase()) > -1);

  const renderContent = () => {
    if (isFetched && filtered && filtered.length === 0) {
      return <NoResults />;
    }

    if (filtered) {
      return (
        <>
          {filtered.map(spell => (
            <CodexRow
              key={spell.id}
              title={spell.name}
              onClick={() => dispatch({ type: 'open_spell_block', id: spell.id })}
              onViewClick={() => dispatch({ type: 'open_spell_block', id: spell.id })}
              highlight={query}
            />
          ))}
        </>
      );
    }

    return <div className="h-32 loading-dark" />;
  };

  return (
    <>
      <SearchInput query={query} setQuery={setQuery} />
      <div className="overflow-auto rounded-b-md flex-grow bg-white">
        {renderContent()}
      </div>
    </>
  );
};
