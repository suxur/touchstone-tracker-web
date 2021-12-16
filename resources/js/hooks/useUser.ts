import { usePage } from '@inertiajs/inertia-react';
import { Page, PageProps } from '@inertiajs/inertia';
import { User } from '@/types';

interface Props extends PageProps {
  user: User;
}

export const useUser = () => {
  const { user } = usePage<Page<Props>>().props;
  return user;
}
