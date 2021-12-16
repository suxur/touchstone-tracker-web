import React, { useState } from "react";
import { useQuery } from "react-query";
import { CodexSpell, Spell } from '@/types';
import { CodexRow } from '../CodexRow';
import { NoResults } from '../NoResults';
import { MoveableStatBlocks } from '../../StatBlock/MoveableStatBlocks';
import axios from 'axios';
import { MoveableSpellBlock } from '../../SpellBlock/MoveableSpellBlock';
import { Fade } from '../../Fade';
import SearchInput from '../SearchInput';
import { routes } from '../../../constants';

interface SpellBlock {
  id: number;
  showing: boolean;
  spell: Spell;
}

export const getSpell = async (id: number | null) => {
  const { data } = await axios.get<Spell>(`/api/spell/${id}`);
  return data;
};

export const Spells = () => {
  const [query, setQuery] = useState('');
  const [spellBlocks, setSpellBlocks] = useState<SpellBlock[]>([]);
  const [openSpellId, setOpenSpellId] = useState<number | null>(null);

  const { isFetching, isFetched, error, data } = useQuery<CodexSpell[]>(routes.CODEX_SPELLS, {
    initialData: []
  });

  useQuery<Spell>(['spell', openSpellId], () => getSpell(openSpellId), {
    enabled: openSpellId !== null,
    onSuccess: (data) => {
      setOpenSpellId(null);
      setSpellBlocks([...spellBlocks, {
        id: data.id,
        showing: true,
        spell: data
      }]);
    }
  });

  const filtered = data?.filter(spell => {
    return spell.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });

  const openSpellBlock = (spell: CodexSpell) => {
    const spellBlock = spellBlocks.find(spellBlock => spellBlock.id === spell.id);
    if (spellBlock) {
      const newItems = spellBlocks.map(sb => {
        if (spellBlock.id == sb.id) {
          return { ...sb, showing: true };
        }
        return sb;
      });
      setSpellBlocks(newItems);
    } else {
      setOpenSpellId(spell.id);
    }
  };

  const closeSpellBlock = (id: number) => {
    const newItems = spellBlocks.map(sb => {
      if (id === sb.id) {
        return { ...sb, showing: false };
      }
      return sb;
    });
    setSpellBlocks(newItems);
  };

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
              onClick={() => openSpellBlock(spell)}
              onViewClick={() => openSpellBlock(spell)}
            />
          ))}
        </>
      );
    }

    return <div className="h-32 loading-dark" />
  };

  return (
    <>
      <SearchInput query={query} setQuery={setQuery} />
      <div className="overflow-auto rounded-b-md flex-grow bg-white">
        {renderContent()}
      </div>
      <MoveableStatBlocks>
        {spellBlocks.map(spellBlock => (
          <Fade key={spellBlock.id} showing={spellBlock.showing}>
            <MoveableSpellBlock spell={spellBlock.spell} close={() => closeSpellBlock(spellBlock.id)} />
          </Fade>
        ))}
      </MoveableStatBlocks>
    </>
  );
};
