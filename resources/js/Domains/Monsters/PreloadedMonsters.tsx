import * as React from 'react';
import { useState } from 'react';

import { StatBlock } from '@/types';
import { ActionSection } from '@/Components/Jetstream';
import { CloneButton } from '@/Components/Button/CloneButton';
import { Pagination } from '@/Components/Pagination';
import {useCloneStatBlock} from '@/Hooks/StatBlocks/useCloneStatBlock';
import { usePreloadedMonsters } from '@/Hooks/StatBlocks/usePreloadedMonsters';

export const PreloadedMonsters = () => {
  const [page, setPage] = useState(1);
  const cloneStatBlock = useCloneStatBlock();

  const { isSuccess, data } = usePreloadedMonsters({ page });

  const clone = (statBlock: StatBlock) => {
    cloneStatBlock.mutate({ statBlock, type: 'monster' });
  };

  return (
    <ActionSection
      title="Preloaded Monsters"
      description="All of the monsters that are preloaded."
    >
      {isSuccess && data && data.data.length > 0 ? (
        <>
          <div className="space-y-4 divide-y divide-gray-200">
            {data.data.map((monster) => (
              <div key={monster.id} className="pt-2 first:pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div>{monster.name}</div>
                  </div>
                  <div className="flex items-center">
                    <CloneButton onClick={() => clone(monster)} />
                  </div>
                </div>
                <span className="mt-2 text-xs py-1 px-2 bg-gray-200 rounded-md">
                  {monster.collection}
                </span>
              </div>
            ))}
          </div>
          <Pagination
            pagination={data}
            prev={() => setPage(page - 1)}
            next={() => setPage(page + 1)}
          />
        </>
      ) : (
        <p>No preloaded monsters? Something must be wrong.</p>
      )}
    </ActionSection>
  );
};
