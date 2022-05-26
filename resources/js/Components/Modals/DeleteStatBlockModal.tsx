import * as React from "react";
import { useCallback } from "react";

import {
  JetConfirmationModal,
  JetDangerButton,
  ModalProps,
} from "@/Components/Jetstream";
import { JetTransparentButton } from "@/Components/Jetstream/TransparentButton";
import { StatBlock, StatBlockType } from "@/types";
import { startCase } from "lodash";
import { useDeleteStatBlock } from "@/Hooks/StatBlocks/useDeleteStatBlock";

interface Props extends ModalProps {
  statBlock?: StatBlock;
  type: StatBlockType;
}

export const DeleteStatBlockModal = ({
  statBlock,
  type,
  isOpen,
  onClose,
}: Props) => {
  const deleteStatBlock = useDeleteStatBlock();

  const confirm = useCallback(() => {
    if (statBlock) {
      deleteStatBlock.mutate(
        { statBlock, type },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  }, [deleteStatBlock, onClose, statBlock]);

  return (
    <JetConfirmationModal isOpen={isOpen} onClose={onClose}>
      <JetConfirmationModal.Content title={`Delete ${startCase(type)}?`}>
        <p>
          Are you sure you want to remove the <strong>{statBlock?.name}</strong>{" "}
          {type}?
        </p>
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        <JetTransparentButton className="mr-2" onClick={onClose}>
          Cancel
        </JetTransparentButton>
        <JetDangerButton processing={deleteStatBlock.isLoading} onClick={confirm}>
          Delete
        </JetDangerButton>
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};
