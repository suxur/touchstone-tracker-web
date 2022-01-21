import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Sidebar } from '@/Layouts/Sidebar';
import { Encounter as EncounterType } from '@/types';
import { EncounterView } from '@/Components/Encounter/EncounterView';
import useTypedPage from '@/Hooks/useTypedPage';
import { EncountersTab } from '@/Components/Codex/Tabs';
import { ListBody, ListHeader } from '@/Components/List';
import { JetButton } from '@/Components/Jetstream';

interface Props {
  encounter: EncounterType;
}

const EncountersShow = () => {
  const { user, encounter } = useTypedPage<Props>().props;

  return (
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
};

export default EncountersShow;
