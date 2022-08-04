import React, { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/inertia-react';

import { CodexEncounter } from '@/types';
import { ONE_MINUTE, routes } from '@/constants';
import { useEncounter } from '@/Hooks/useEncounter';
import { EncounterRow } from '@/Components/Codex/Encounters/EncounterRow';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { DeleteEncounterModal } from '@/Components/Modals/DeleteEncounterModal';
import { NoResults } from '@/Components/Codex/NoResults';

type DeleteModal = {
  isOpen: boolean;
  encounter?: CodexEncounter;
}

export const EncountersTab = () => {
  const queryClient = useQueryClient();
  const { encounter: activeEncounter, store } = useEncounter();

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
  });

  const { isFetched, data } = useQuery<CodexEncounter[]>(routes.CODEX_ENCOUNTERS, {
    staleTime: ONE_MINUTE,
  });

  const form = useForm({});

  const createEncounter = () => {
    store.mutate(null);
  };

  const cancelDeleteAction = useCallback(() => {
    setDeleteModal({ ...deleteModal, isOpen: false });
    queryClient.invalidateQueries(routes.CODEX_ENCOUNTERS);
  }, [deleteModal, queryClient]);

  const renderContent = () => {
    if (isFetched && data && data.length === 0) {
      return <NoResults />;
    }

    if (data) {
      return (
        <>
          {data.map(encounter => (
            <EncounterRow
              key={encounter.id}
              activeEncounterId={activeEncounter?.id}
              encounter={encounter}
              onDelete={() => setDeleteModal({ ...deleteModal, isOpen: true, encounter })}
            />
          ))}
        </>
      );
    }

    return <div className="h-32 loading-dark" />;
  };

  return (
    <>
      <div className="overflow-auto rounded-b-md flex-grow bg-white">
        {renderContent()}
      </div>
      <JetTransparentButton type="button" className="w-full mt-2" processing={form.processing} onClick={createEncounter}>
        <FontAwesomeIcon icon="plus" />
        <span className="ml-2">New Encounter</span>
      </JetTransparentButton>
      <DeleteEncounterModal
        encounter={deleteModal.encounter}
        isOpen={deleteModal.isOpen}
        onClose={cancelDeleteAction}
      />
    </>
  );
};
