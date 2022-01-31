import * as React from 'react';
import { Combatant } from '@/types';
import { useEncounter } from '@/Hooks/useEncounter';
import {
  ConfirmModal,
  ConfirmModalContents,
  ConfirmModalDismissAsyncButton,
  ConfirmModalDismissButton,
  ConfirmModalOpenButton,
} from '@/Components/Modals/ConfirmModal';
import { DeleteButton } from '@/Components/Button/DeleteButton';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import { JetDangerButton } from '@/Components/Jetstream';

interface Props {
  combatant: Combatant;
}

export const DeleteCombatantModal = ({ combatant }: Props) => {
  const { removeCombatant } = useEncounter();
  const confirm = () => removeCombatant.mutate(combatant.id);

  return (
    <ConfirmModal>
      <ConfirmModalOpenButton>
        <DeleteButton />
      </ConfirmModalOpenButton>
      <ConfirmModalContents
        title="Remove Combatant?"
        actions={(
          <>
            <ConfirmModalDismissButton>
              <JetTransparentButton className="mr-2">
                Cancel
              </JetTransparentButton>
            </ConfirmModalDismissButton>
            <ConfirmModalDismissAsyncButton>
              <JetDangerButton processing={removeCombatant.isLoading} onClick={confirm}>
                Remove
              </JetDangerButton>
            </ConfirmModalDismissAsyncButton>
          </>
        )}
      >
        <p>Are you sure you want to remove the <strong>{combatant?.name}</strong> combatant?</p>
      </ConfirmModalContents>
    </ConfirmModal>
  );
};
