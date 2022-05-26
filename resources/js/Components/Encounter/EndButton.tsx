import * as React from 'react';
import { useEncounter } from '@/Hooks/useEncounter';
import { JetDangerButton, JetDangerButtonProps } from '@/Components/Jetstream';

export const EndButton = ({ ...props }: JetDangerButtonProps) => {
  const { mutation, encounter } = useEncounter();

  const onClick = () => {
    if (encounter) {
      return mutation.mutate({
        ...encounter,
        is_active: false,
        started_at: null,
      });
    }

    return null;
  };

  return (
    <JetDangerButton {...props} onClick={onClick} processing={mutation.isLoading}>
      End
    </JetDangerButton>
  );
};
