import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JetButton } from '@/Components/Jetstream';
import { useEncounter } from '@/Hooks/useEncounter';

export const NextButton = () => {

  const { encounter } = useEncounter();
  const route = useRoute();
  const form = useForm({
    increment_active_index: true
  });

  const onClick = () => {
    form.post(route('encounters.update', { encounter }), {
      only: ['encounter'],
    });
  };

  return (
    <JetButton onClick={onClick}>
      Next &nbsp;<FontAwesomeIcon icon="chevron-right" />
    </JetButton>
  );
};