import { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { Encounter, VoidFn } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { useIsMounting } from '@/Hooks/useIsMounting';
import useTypedPage from '@/Hooks/useTypedPage';
import { PageProps } from '@inertiajs/inertia';

interface Props {
  onSuccess?: VoidFn;
}

interface TypedPageProps extends PageProps {
  encounter: Encounter;
}

export const useUpdateEncounter = ({ onSuccess }: Props) => {
  const { encounter } = useTypedPage<TypedPageProps>().props;

  const isMounting = useIsMounting();
  const route = useRoute();
  const form = useForm<Encounter>({ ...encounter });

  useEffect(() => {
    if (isMounting) {
      return;
    }

    form.post(route('encounters.update', { encounter }), {
      onSuccess: () => onSuccess ? onSuccess() : null,
      only: ['encounter']
    });
  }, [form.data]);

  return {
    data: form.data,
    update: form.setData,
    processing: form.processing,
  };
};