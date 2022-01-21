import * as React from 'react';
import { useCallback } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { JetConfirmationModal, JetDangerButton, ModalProps } from '@/Components/Jetstream';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { Combatant } from '@/types';
import { useEncounter } from '@/Hooks/useEncounter';

interface Props extends ModalProps {
  combatant?: Combatant;
  type?: 'monster' | 'character';
}

export const DeleteCombatantModal = ({ combatant, type, isOpen, onClose }: Props) => {
  const route = useRoute();
  const { post, processing } = useForm({ combatant, type });
  const { encounter } = useEncounter();

  const confirm = useCallback(() => {
    if (combatant) {
      post(route('encounter.remove', { encounter, combatant }), {
        only: ['encounter'],
        onSuccess: () => onClose()
      });
    }
  }, [encounter, combatant]);

  return (
    <JetConfirmationModal isOpen={isOpen} onClose={onClose}>
      <JetConfirmationModal.Content title="Remove Combatant?">
        <p>Are you sure you want to remove the <strong>{combatant?.name}</strong> combatant?</p>
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        <JetTransparentButton className="mr-2" onClick={onClose}>
          Cancel
        </JetTransparentButton>
        <JetDangerButton processing={processing} onClick={confirm}>
          Remove
        </JetDangerButton>
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};
