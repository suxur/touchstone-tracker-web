import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Sidebar } from '@/Layouts/Sidebar';
import { Encounter as EncounterType } from '@/types';
import { EncounterView } from '@/Components/Encounter/EncounterView';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props  {
  encounter: EncounterType
}

export default function EncounterPage() {
  const { user, encounter } = useTypedPage<Props>().props;

  return (
    <AppLayout>
      <div className="h-full w-full flex flex-row">
        <Sidebar />
        <main className="w-full flex flex-row py-4 px-2">
          <EncounterView user={user} encounter={encounter}/>
        </main>
      </div>
    </AppLayout>
  );
}
