import * as React from 'react';
import { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { CharacterPermissions, Classes, StatBlock } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { ActionSection } from '@/Components/Jetstream';
import { ClassIcon } from '@/Components/ClassIcon/ClassIcon';
import { DeleteButton } from '@/Components/Button/DeleteButton';
import { CloneButton } from '@/Components/Button/CloneButton';
import { CreateStatBlockForm } from '@/Components/Modals/CreateStatBlockForm';
import { DeleteStatBlockModal } from '@/Components/Modals/DeleteStatBlockModal';
import { EditButton } from '@/Components/Button/EditButton';
import { Button } from '@/Components/Button';

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
  const [statBlock, setStatBlock] = useState<StatBlock>();

  const [createCharacterModal, setCreateCharacterModal] = useState({
    isOpen: false,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
  });

  const clone = useForm({});
  const cloneCharacter = (character: StatBlock) => {
    clone.post(route('stat_block.clone', { stat_block: character, type: 'character' }));
  };

  const editCharacter = (character: StatBlock) => {
    setStatBlock(character);
    setCreateCharacterModal({ isOpen: true });
  };

  const confirmCharacterRemoval = (character: StatBlock) => {
    setDeleteModal({ character, isOpen: true });
  };

  return (
    <ActionSection
      title="Characters"
      description="All of the characters that are part of this team."
      actions={(
        <Button
          onClick={() => {
            setStatBlock(undefined);
            setCreateCharacterModal({ isOpen: true });
          }}
        >
          Add Character
        </Button>
      )}
    >
      {characters.length > 0 ? (
        <div className="space-y-4 divide-y divide-gray-200">
          {characters.map(character => (
            <div key={character.id} className="flex items-center justify-between pt-4 first:pt-0">
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
                    <EditButton onClick={() => editCharacter(character)} />
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
        statBlock={statBlock}
        type="character"
      />
      <DeleteStatBlockModal
        isOpen={deleteModal.isOpen}
        statBlock={deleteModal.character}
        type="character"
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </ActionSection>
  );
};
