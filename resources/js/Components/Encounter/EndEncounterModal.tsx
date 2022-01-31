import * as React from 'react';
import {
  ConfirmModal,
  ConfirmModalContents,
  ConfirmModalDismissAsyncButton,
  ConfirmModalDismissButton,
  ConfirmModalOpenButton,
} from '@/Components/Modals/ConfirmModal';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { EndButton } from '@/Components/Encounter/EndButton';
import { EndAndClearButton } from '@/Components/Encounter/EndAndClearButton';

export const EndEncounterModal = () => (
  <ConfirmModal>
    <ConfirmModalOpenButton>
      <JetTransparentButton className="mr-2">End Encounter</JetTransparentButton>
    </ConfirmModalOpenButton>
    <ConfirmModalContents
      title="End Encounter?"
      actions={(
        <>
          <ConfirmModalDismissButton>
            <JetTransparentButton className="mr-2">
              Cancel
            </JetTransparentButton>
          </ConfirmModalDismissButton>
          <ConfirmModalDismissAsyncButton>
            <EndButton className="mr-2" />
          </ConfirmModalDismissAsyncButton>
          <ConfirmModalDismissAsyncButton>
            <EndAndClearButton />
          </ConfirmModalDismissAsyncButton>
        </>
        )}
    >
      <p>Are you sure you want to end the encounter?</p>
    </ConfirmModalContents>
  </ConfirmModal>
);
