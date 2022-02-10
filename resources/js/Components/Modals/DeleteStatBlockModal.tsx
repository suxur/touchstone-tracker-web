import * as React from 'react';
import { useCallback } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { JetConfirmationModal, JetDangerButton, ModalProps } from '@/Components/Jetstream';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { StatBlock, StatBlockType } from '@/types';
import { startCase } from 'lodash';

interface Props extends ModalProps {
  statBlock?: StatBlock;
  type: StatBlockType
}

export const DeleteStatBlockModal = ({ statBlock, type, isOpen, onClose }: Props) => {
  const route = useRoute();
  const form = useForm({ stat_block: statBlock, type });

  const confirm = useCallback(() => {
    if (statBlock) {
      form.delete(route('stat-blocks.destroy', { stat_block: statBlock }), {
        onSuccess: () => onClose(),
      });
    }
  }, [form, onClose, route, statBlock]);

  return (
    <JetConfirmationModal isOpen={isOpen} onClose={onClose}>
      <JetConfirmationModal.Content title={`Delete ${startCase(type)}?`}>
        <p>Are you sure you want to remove the <strong>{statBlock?.name}</strong> {type}?</p>
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        <JetTransparentButton className="mr-2" onClick={onClose}>
          Cancel
        </JetTransparentButton>
        <JetDangerButton processing={form.processing} onClick={confirm}>
          Delete
        </JetDangerButton>
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};
