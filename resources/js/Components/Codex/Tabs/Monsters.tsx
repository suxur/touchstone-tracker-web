import * as React from 'react';
import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QuickAdd from "../QuickAdd";
import { CodexRow } from '../CodexRow';
import { CodexMonster, Combatant, SetAction } from '@/types';
import SearchInput from '../SearchInput';
import { routes } from '../../../constants';
import { NoResults } from '../NoResults';
import { MoveableStatBlocks } from '../../StatBlock/MoveableStatBlocks';
import { MoveableStatBlock } from '../../StatBlock/MoveableStatBlock';
import { Fade } from '../../Fade';
import { noop } from '../../../lib/helpers';
import { MonsterRow } from '../Monster/MonsterRow';

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

// export const getMonsterCombatant = async (id: number | null) => {
//   const { data } = await axios.get<Combatant>(`/api/monster/${id}`);
//   return data;
// };


export const Monsters = () => {
  const [query, setQuery] = useState('');
  const [statBlocks, setStatBlocks] = useState<StatBlock[]>([]);
  const [openMonsterId, setOpenMonsterId] = useState<number | null>(null);

  const { error, data, isFetched } = useQuery<CodexMonster[]>(routes.CODEX_MONSTERS, {
    initialData: []
  });

  // useQuery<Combatant>(['monster', openMonsterId], () => getMonsterCombatant(openMonsterId), {
  //   enabled: openMonsterId !== null,
  //   onSuccess: (data) => {
  //     setOpenMonsterId(null);
  //     setStatBlocks([...statBlocks, {
  //       id: data.id,
  //       showing: true,
  //       combatant: data
  //     }]);
  //   }
  // });
  //
  const filtered = data?.filter(combatant => {
    return combatant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });

  const openStatBlock = (monster: CodexMonster) => {
    const statBlock = statBlocks.find(statBlock => statBlock.id === monster.id);
    if (statBlock) {
      const newItems = statBlocks.map(sb => {
        if (statBlock.id == sb.id) {
          return { ...sb, showing: true };
        }
        return sb;
      });
      setStatBlocks(newItems);
    } else {
      setOpenMonsterId(monster.id);
    }
  };

  const closeStatBlock = (id: number) => {
    const newItems = statBlocks.map(sb => {
      if (id === sb.id) {
        return { ...sb, showing: false };
      }
      return sb;
    });
    setStatBlocks(newItems);
  };

  const renderContent = () => {
    if (isFetched && filtered && filtered.length === 0) {
      return <NoResults />;
    }

    if (filtered) {
      return (
        <>
          {filtered?.map(monster => (
            <MonsterRow key={monster.id} monster={monster} />
            // <CodexRow
            //   key={monster.id}
            //   title={monster.name}
            //   onClick={() => {}}
            //   onViewClick={() => openStatBlock(monster)}
            // />
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
      <div className="overflow-auto rounded-b-md flex-grow bg-white">
        <div className="p-2 bg-white">
          {/*<quick-add-input :type="type"></quick-add-input>*/}
          <QuickAdd />
        </div>
        <div>
          {renderContent()}
        </div>
      </div>
      <button type="button" className="button button-transparent w-full mt-2">
        <FontAwesomeIcon icon="plus" />
        <span className="ml-2">New Monster</span>
      </button>
      {/*<MoveableStatBlocks>*/}
      {/*  {statBlocks.map(statBlock => (*/}
      {/*    <Fade key={statBlock.id} showing={statBlock.showing}>*/}
      {/*      <MoveableStatBlock combatant={statBlock.combatant} close={() => closeStatBlock(statBlock.id)} />*/}
      {/*    </Fade>*/}
      {/*  ))}*/}
      {/*</MoveableStatBlocks>*/}
    </MonstersContext.Provider>
  );
};
