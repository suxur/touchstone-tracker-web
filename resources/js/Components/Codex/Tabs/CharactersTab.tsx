import * as React from 'react';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CodexCharacter } from '@/types';
import { CLASSES, ONE_MINUTE, routes } from '@/constants';
import { QuickAdd } from '@/Components/Codex/QuickAdd';
import { ClassIcon } from '@/Components/ClassIcon/ClassIcon';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { CharacterRow } from '@/Components/Codex/Characters/CharacterRow';
import { CreateStatBlockForm } from '@/Components/Modals/CreateStatBlockForm';

export const CharactersTab = () => {
  const [createCharacterModal, setCreateCharacterModal] = useState({
    isOpen: false,
  });

  const icon = useMemo(() => CLASSES[Math.floor(Math.random() * CLASSES.length)], []);

  const { data, isFetched } = useQuery<CodexCharacter[]>(routes.CODEX_CHARACTERS, {
    staleTime: ONE_MINUTE,
  });

  const renderContent = () => {
    if (isFetched && data && data.length === 0) {
      return (
        <div className="flex pt-16 items-center p-4 flex-col bg-white flex-grow">
          <span className="mb-4">No Characters Found</span>
          <ClassIcon icon={icon} size="lg" />
          <button className="button mt-4">
            Add Character
          </button>
        </div>
      );
    }

    if (data) {
      return (
        <>
          {data.map(character => (
            <CharacterRow key={character.id} character={character} />
          ))}
        </>
      );
    }

    return <div className="h-32 loading-dark" />;
  };

  return (
    <>
      <div className="p-2 bg-white border-b border-gray-200">
        <QuickAdd type="character" />
      </div>
      <div className="overflow-auto rounded-b-md flex-grow bg-white">
        {renderContent()}
      </div>
      <JetTransparentButton
        type="button"
        className="w-full mt-2"
        onClick={() => setCreateCharacterModal({ isOpen: true })}
      >
        <FontAwesomeIcon icon="plus" />
        <span className="ml-2">New Character</span>
      </JetTransparentButton>
      <CreateStatBlockForm
        isOpen={createCharacterModal.isOpen}
        onClose={() => setCreateCharacterModal({ isOpen: false })}
        type="character"
      />
    </>
  );
};
