import { createContext } from 'react';
import { VoidFn } from '@/types';
import { noop } from '../../lib/helpers';

interface Context {
  open: boolean;
  toggleOpen: VoidFn;
}

export const SidebarContext = createContext<Context>({
  open: true,
  toggleOpen: noop,
});
