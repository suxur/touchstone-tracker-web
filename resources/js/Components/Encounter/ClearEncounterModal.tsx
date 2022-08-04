import * as React from 'react';
import { useCallback } from 'react';

import { useEncounter } from '@/Hooks/useEncounter';
import {
  ConfirmModal,
  ConfirmModalContents,
  ConfirmModalDismissAsyncButton,
  ConfirmModalDismissButton,
  ConfirmModalOpenButton,
} from '@/Components/Modals/ConfirmModal';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { JetDangerButton } from '@/Components/Jetstream';

export const ClearEncounterModal = () => {
  const { mutation, encounter } = useEncounter();

  const confirm = useCallback(() => {
    if (encounter) {
      mutation.mutateAsync({ ...encounter, combatants: [] });
    }
  }, [mutation]);

  if (encounter) {
    return (
      <ConfirmModal>
        <ConfirmModalOpenButton>
          <JetTransparentButton className="mr-2">Clear</JetTransparentButton>
        </ConfirmModalOpenButton>
        <ConfirmModalContents
          title="Clear Encounter?"
          actions={(
            <>
              <ConfirmModalDismissButton>
                <JetTransparentButton className="mr-2">
                  Cancel
                </JetTransparentButton>
              </ConfirmModalDismissButton>
              <ConfirmModalDismissAsyncButton>
                <JetDangerButton processing={mutation.isLoading} onClick={confirm}>
                  Remove
                </JetDangerButton>
              </ConfirmModalDismissAsyncButton>
            </>
          )}
        >
          <p>Are you sure you want to clear the encounter?</p>
        </ConfirmModalContents>
      </ConfirmModal>
    );
  }

  return null;
};
