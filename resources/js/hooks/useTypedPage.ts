import { Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { InertiaSharedProps } from '@/types';

export default function useTypedPage<T = Record<string, unknown>>() {
  return usePage<Page<InertiaSharedProps<T>>>();
}
