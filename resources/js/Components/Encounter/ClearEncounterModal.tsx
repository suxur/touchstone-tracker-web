import * as React from 'react';
import { useCallback } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
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
import { useMutation } from 'react-query';
import axios from 'axios';
import queryClient from '@/lib/query-client';

export const ClearEncounterModal = () => {
  const route = useRoute();
  const { encounter } = useEncounter();

  const mutation = useMutation(() => axios.post(route('api.encounter.clear', { encounter })), {
    onSuccess: (response) => {
      queryClient.setQueryData(['encounter', encounter?.id], response.data);
    },
  });

  const confirm = useCallback(() => {
    mutation.mutate();
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
