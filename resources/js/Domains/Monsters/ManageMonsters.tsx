import * as React from 'react';
import { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { MonsterPermissions, StatBlock } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { JetActionSection, JetButton } from '@/Components/Jetstream';
import { DeleteButton } from '@/Components/Button/DeleteButton';
import { CloneButton } from '@/Components/Button/CloneButton';
import { CreateStatBlockForm } from '@/Components/Modals/CreateStatBlockForm';
import { DeleteStatBlockModal } from '@/Components/Modals/DeleteStatBlockModal';

interface Props {
  monsters: StatBlock[];
  permissions: MonsterPermissions;
}

type DeleteModal = {
  isOpen: boolean;
  monster?: StatBlock;
}

export const ManageMonsters = ({ monsters, permissions }: Props) => {
  const route = useRoute();

  const [createMonsterModal, setCreateMonsterModal] = useState({
    isOpen: false,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
  });

  const clone = useForm({});
  const cloneMonster = (monster: StatBlock) => {
    clone.post(route('stat_block.clone', { stat_block: monster, type: 'monster' }));
  };

  const confirmMonsterRemoval = (monster: StatBlock) => {
    setDeleteModal({ monster, isOpen: true });
  };

  return (
    <JetActionSection
      title="Monsters"
      description="All of the monsters that are part of this team."
      actions={(
        <JetButton onClick={() => setCreateMonsterModal({ isOpen: true })}>
          Add Monster
        </JetButton>
      )}
    >
      {monsters.length > 0 ? (
        <div className="space-y-6">
          {monsters.map(monster => (
            <div key={monster.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="ml-4">{monster.name}</div>
              </div>
              <div className="flex items-center">
                {permissions.canManageMonsters && (
                  <>
                    <CloneButton onClick={() => cloneMonster(monster)} />
                    <DeleteButton onClick={() => confirmMonsterRemoval(monster)} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No monsters found...</p>
      )}
      <CreateStatBlockForm
        isOpen={createMonsterModal.isOpen}
        onClose={() => setCreateMonsterModal({ isOpen: false })}
        type="monster"
      />
      <DeleteStatBlockModal
        isOpen={deleteModal.isOpen}
        statBlock={deleteModal.monster}
        type="monster"
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </JetActionSection>
  );
};
