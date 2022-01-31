import * as React from 'react';
import { useCallback } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { CodexEncounter } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { JetConfirmationModal, JetDangerButton, ModalProps } from '@/Components/Jetstream';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';

interface Props extends ModalProps {
  encounter?: CodexEncounter;
}

export const DeleteEncounterModal = ({ encounter, isOpen, onClose }: Props) => {
  const route = useRoute();
  const form = useForm({});

  const confirm = useCallback(() => {
    if (encounter) {
      form.delete(route('encounter.destroy', { encounter }), {
        only: ['encounter'],
        onSuccess: () => onClose(),
      });
    }
  }, [encounter, form, onClose, route]);

  return (
    <JetConfirmationModal isOpen={isOpen} onClose={onClose}>
      <JetConfirmationModal.Content title="Remove Encounter?">
        <p>Are you sure you want to remove the <strong>{encounter?.slug}</strong> encounter?</p>
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        <JetTransparentButton className="mr-2" onClick={onClose}>
          Cancel
        </JetTransparentButton>
        <JetDangerButton processing={form.processing} onClick={confirm}>
          Remove
        </JetDangerButton>
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};
