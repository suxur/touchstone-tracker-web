import { Page, PageProps } from '@inertiajs/inertia';
import { User } from '@/types';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props extends PageProps {
  user: User;
}

export const useUser = () => {
  const { user } = useTypedPage<Page<Props>>().props;
  return user;
};
