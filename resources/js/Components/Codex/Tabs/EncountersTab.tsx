import React, { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { routes } from '@/constants';
import { NoResults } from '../NoResults';
import { useEncounter } from '@/Hooks/useEncounter';
import { EncounterRow } from '@/Components/Codex/Encounters/EncounterRow';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/inertia-react';

import { CodexEncounter } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { DeleteEncounterModal } from '@/Components/Modals/DeleteEncounterModal';

type DeleteModal = {
  isOpen: boolean;
  encounter?: CodexEncounter;
}

export const EncountersTab = () => {
  const route = useRoute();
  const queryClient = useQueryClient();
  const { encounter: activeEncounter } = useEncounter();

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
  });

  const { isFetching, isFetched, error, data } = useQuery<CodexEncounter[]>(routes.CODEX_ENCOUNTERS, {
    initialData: []
  });

  const form = useForm({});

  const createEncounter = () => {
    form.post(route('encounters.create'));
    queryClient.invalidateQueries(routes.CODEX_ENCOUNTERS);
  }

  const cancelDeleteAction = useCallback(() => {
    setDeleteModal({ ...deleteModal, isOpen: false });
    queryClient.invalidateQueries(routes.CODEX_ENCOUNTERS);
  }, [deleteModal, setDeleteModal]);

  const renderContent = () => {
    if (isFetched && data && data.length === 0) {
      return <NoResults />;
    }

    if (data) {
      return (
        <>
          {data.map(encounter => (
            <EncounterRow
              active_encounter_id={activeEncounter?.id}
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
      <DeleteEncounterModal encounter={deleteModal.encounter} isOpen={deleteModal.isOpen} onClose={cancelDeleteAction} />
    </>
  );
};
