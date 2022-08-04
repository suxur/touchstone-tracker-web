import * as React from "react";
import { useCallback } from "react";

import { CodexEncounter } from "@/types";
import {
  JetConfirmationModal,
  JetDangerButton,
  ModalProps,
} from "@/Components/Jetstream";
import { JetTransparentButton } from "@/Components/Jetstream/TransparentButton";
import { useEncounter } from "@/Hooks/useEncounter";

interface Props extends ModalProps {
  encounter?: CodexEncounter;
}

export const DeleteEncounterModal = ({ encounter, isOpen, onClose }: Props) => {
  const { destroy } = useEncounter();

  const confirm = useCallback(() => {
    if (encounter) {
      destroy.mutate(encounter, {
        onSuccess: () => onClose(),
      });
    }
  }, [encounter, destroy, onClose]);

  return (
    <JetConfirmationModal isOpen={isOpen} onClose={onClose}>
      <JetConfirmationModal.Content title="Remove Encounter?">
        <p>
          Are you sure you want to remove the <strong>{encounter?.slug}</strong>{" "}
          encounter?
        </p>
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        <JetTransparentButton className="mr-2" onClick={onClose}>
          Cancel
        </JetTransparentButton>
        <JetDangerButton processing={destroy.isLoading} onClick={confirm}>
          Remove
        </JetDangerButton>
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};
