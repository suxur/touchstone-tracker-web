import * as React from 'react';
import { JetConfirmationModal, ModalProps } from '@/Components/Jetstream';
import { EndButton } from '@/Components/Encounter/EndButton';
import { EndAndClearButton } from '@/Components/Encounter/EndAndClearButton';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';

export const EndEncounterModal = ({ isOpen, onClose }: ModalProps) => {

  return (
    <JetConfirmationModal isOpen={isOpen} onClose={onClose}>
      <JetConfirmationModal.Content title="End Encounter?">
        <p>Are you sure you want to end the encounter?</p>
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        <JetTransparentButton onClick={onClose}>
          Cancel
        </JetTransparentButton>
        <EndButton onSuccess={onClose}/>
        <EndAndClearButton onSuccess={onClose}/>
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};
