import { useForm } from '@inertiajs/inertia-react';
import route from '@/lib/route';

export const useLogout = () => {
  const { post } = useForm({});
  return () => post(route('logout'));
};
