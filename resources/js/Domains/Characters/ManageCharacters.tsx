import * as React from 'react';
import { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { CharacterPermissions, Classes, StatBlock } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { JetActionSection, JetButton } from '@/Components/Jetstream';
import { ClassIcon } from '@/Components/ClassIcon/ClassIcon';
import { DeleteButton } from '@/Components/Button/DeleteButton';
import { CloneButton } from '@/Components/Button/CloneButton';
import { CreateStatBlockForm } from '@/Components/Modals/CreateStatBlockForm';
import { DeleteStatBlockModal } from '@/Components/Modals/DeleteStatBlockModal';

interface Props {
  characters: StatBlock[];
  permissions: CharacterPermissions;
}

type DeleteModal = {
  isOpen: boolean;
  character?: StatBlock;
}

export const ManageCharacters = ({ characters, permissions }: Props) => {
  const route = useRoute();

  const [createCharacterModal, setCreateCharacterModal] = useState({
    isOpen: false,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
  });

  const clone = useForm({});
  const cloneCharacter = (monster: StatBlock) => {
    clone.post(route('stat_block.clone', { stat_block: monster, type: 'character' }));
  };

  const confirmCharacterRemoval = (character: StatBlock) => {
    setDeleteModal({ character, isOpen: true });
  };

  return (
    <JetActionSection
      title="Characters"
      description="All of the characters that are part of this team."
      actions={(
        <JetButton onClick={() => setCreateCharacterModal({ isOpen: true })}>
          Add Character
        </JetButton>
      )}
    >
      {characters.length > 0 ? (
        <div className="space-y-6">
          {characters.map(character => (
            <div key={character.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {character.subtype ? (
                  <ClassIcon icon={character.subtype as Classes} size="sm" />
                ) : (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURI(character.name)}&color=7C3AED&background=DDD6FE`}
                    alt={character.name}
                  />
                )}
                <div className="ml-4">{character.name}</div>
              </div>
              <div className="flex items-center">
                {permissions.canManageCharacters && (
                  <>
                    <CloneButton onClick={() => cloneCharacter(character)} />
                    <DeleteButton onClick={() => confirmCharacterRemoval(character)} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No characters found...</p>
      )}
      <CreateStatBlockForm
        isOpen={createCharacterModal.isOpen}
        onClose={() => setCreateCharacterModal({ isOpen: false })}
        type="character"
      />
      <DeleteStatBlockModal
        isOpen={deleteModal.isOpen}
        statBlock={deleteModal.character}
        type="character"
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </JetActionSection>
  );
};
