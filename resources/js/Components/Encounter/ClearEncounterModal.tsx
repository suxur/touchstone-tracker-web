import * as React from 'react';
import { useCallback, useContext } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import clsx from 'clsx';

import { JetConfirmationModal, ModalProps } from '../Jetstream';
import { EncounterContext } from './EncounterProvider';
import route from '../../lib/route';
import { useEncounter } from '../../hooks/useEncounter';

export const ClearEncounterModal = ({isOpen, onClose}: ModalProps) => {
  const { post, processing } = useForm({});
  const { encounter } = useEncounter();

  const confirm = useCallback(() => {
    post(route('encounter.clear', { encounter: encounter.id }), {
      only: ['encounter', 'combatants'],
      onSuccess: () => onClose()
    });

  }, [post, encounter]);

  return (
    <JetConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <JetConfirmationModal.Content title="Clear Encounter?">
        <p>Are you sure you want to clear the encounter?</p>
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        <button className="button bg-transparent hover:bg-gray-200 text-gray-500 mr-2" onClick={onClose}>
          Cancel
        </button>
        <button className={clsx("button bg-red-600 hover:bg-red-700", { 'loading': processing })} onClick={confirm}>
          Remove
        </button>
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};
