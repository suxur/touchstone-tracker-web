import * as React from 'react';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SidebarContext } from '@/Components/Sidebar/SidebarContext';
import { Codex } from '@/Components/Codex/Codex';
import { CodexProvider } from '@/Components/Codex/CodexContext';

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, toggleOpen }}>
      <aside className={clsx('relative h-full flex flex-row')}>
        <div className="flex flex-col w-14 bg-purple-600 h-full text-white">
          <div
            className={clsx(
              'flex justify-center items-center h-14 cursor-pointer hover:bg-purple-800',
              { 'bg-purple-800': open },
            )}
            onClick={toggleOpen}
          >
            <FontAwesomeIcon icon="book" />
          </div>
        </div>
        <div className={clsx({ hidden: !open }, 'ml-2 flex flex-grow w-96')}>
          <div className="w-full py-4">
            <CodexProvider>
              <Codex />
            </CodexProvider>
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};


