import * as React from 'react';
import { useMemo, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { StatBlock, StatBlockPermissions, StatBlockType } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { JetActionSection, JetButton } from '@/Components/Jetstream';
import { DeleteButton } from '@/Components/Button/DeleteButton';
import { CloneButton } from '@/Components/Button/CloneButton';
import { CreateStatBlockForm } from '@/Components/Modals/CreateStatBlockForm';
import { DeleteStatBlockModal } from '@/Components/Modals/DeleteStatBlockModal';
import { EditButton } from '@/Components/Button/EditButton';
import { startCase } from 'lodash';
import { useStatBlocks } from '@/Hooks/useStatBlocks';

interface Props {
  statBlocks: StatBlock[];
  permissions: StatBlockPermissions;
  type: StatBlockType;
}

type ModalProps = {
  isOpen: boolean;
  statBlock?: StatBlock;
}

export const ManageStatBlocks = ({ statBlocks: init, type, permissions }: Props) => {
  const route = useRoute();

  const { statBlocks } = useStatBlocks(init, type);

  const [createModal, setCreateModal] = useState<ModalProps>({
    isOpen: false,
  });

  const [deleteModal, setDeleteModal] = useState<ModalProps>({
    isOpen: false,
  });

  const edit = (statBlock: StatBlock) => {
    setCreateModal({
      statBlock,
      isOpen: true,
    });
  };

  const cloneForm = useForm({});
  const clone = (statBlock: StatBlock) => {
    cloneForm.post(route('stat_block.clone', { stat_block: statBlock, type }));
  };

  const confirmDelete = (statBlock: StatBlock) => {
    setDeleteModal({ statBlock, isOpen: true });
  };

  const displayTitle = useMemo(() => `${startCase(type)}s`, [type]);

  return (
    <JetActionSection
      title={displayTitle}
      description={`All of the ${displayTitle.toLowerCase()} that are part of this team.`}
      actions={(
        <JetButton onClick={() => setCreateModal({ statBlock: undefined, isOpen: true })}>
          Add {displayTitle}
        </JetButton>
      )}
    >
      {statBlocks.length > 0 ? (
        <div className="space-y-4 divide-y divide-gray-200">
          {statBlocks.map(statBlock => (
            <div key={statBlock.id}>
              <div className="flex items-center justify-between mt-2 first:mt-0">
                <div className="flex flex-col">
                  <div>{statBlock.name}</div>
                </div>
                <div className="flex items-center">
                  {permissions.canManageStatBlocks && (
                    <>
                      <EditButton onClick={() => edit(statBlock)} />
                      <CloneButton onClick={() => clone(statBlock)} />
                      <DeleteButton onClick={() => confirmDelete(statBlock)} />
                    </>
                  )}
                </div>
              </div>
              {statBlock.collection && (
                <span className="mt-2 text-xs py-1 px-2 bg-gray-200 rounded-md">{statBlock.collection}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No {type}s found...</p>
      )}
      <CreateStatBlockForm
        isOpen={createModal.isOpen}
        onClose={() => setCreateModal({ isOpen: false })}
        statBlock={createModal.statBlock}
        type={type}
      />
      <DeleteStatBlockModal
        isOpen={deleteModal.isOpen}
        statBlock={deleteModal.statBlock}
        type={type}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </JetActionSection>
  );
};
