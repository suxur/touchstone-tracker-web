import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { EncountersTab } from '@/Components/Codex/Tabs';
import { ListHeader } from '@/Components/List';

const EncountersShow = () => (
  <AppLayout>
    <div className="h-full w-full flex flex-row">
      <main className="w-full flex flex-row py-4 px-2">
        <div className="w-full">
          <ListHeader>
            <div className="flex justify-center items-center px-2">Encounters</div>
          </ListHeader>
          <EncountersTab />
        </div>
      </main>
    </div>
  </AppLayout>
);

export default EncountersShow;
