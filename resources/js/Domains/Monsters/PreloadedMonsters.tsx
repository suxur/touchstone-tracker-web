import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Pagination as PaginationType, StatBlock } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { JetActionSection } from '@/Components/Jetstream';
import { CloneButton } from '@/Components/Button/CloneButton';
import { Pagination } from '@/Components/Pagination';

interface Props {
  preloaded: PaginationType<StatBlock>;
}

export const PreloadedMonsters = ({ preloaded }: Props) => {
  const { data: monsters } = preloaded;
  const route = useRoute();
  const form = useForm({});
  const cloneMonster = (monster: StatBlock) => {
    form.post(route('stat_block.clone', { stat_block: monster, type: 'monster' }));
  };

  return (
    <JetActionSection
      title="Preloaded Monsters"
      description="All of the monsters that are preloaded."
    >
      {monsters.length > 0 ? (
        <>
          <div className="space-y-4 divide-y divide-gray-200">
            {monsters.map(monster => (
              <div key={monster.id}>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    <div>{monster.name}</div>
                  </div>
                  <div className="flex items-center">
                    <CloneButton onClick={() => cloneMonster(monster)} />
                  </div>
                </div>
                <span className="mt-2 text-xs py-1 px-2 bg-gray-200 rounded-md">{monster.collection}</span>
              </div>
            ))}
          </div>
          <Pagination<StatBlock> pagination={preloaded} />
        </>
      ) : (
        <p>No preloaded monsters? Something must be wrong.</p>
      )}
    </JetActionSection>
  );
};
