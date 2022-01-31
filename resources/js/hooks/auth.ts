import { useForm } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';

export const useLogout = () => {
  const route = useRoute();
  const { post } = useForm({});
  return () => post(route('logout'));
};
