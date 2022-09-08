import * as React from 'react';

import { AppLayout } from '@/Layouts/AppLayout';
import { StatBlockPermissions } from '@/types';
import { PreloadedMonsters } from '@/Domains/Monsters/PreloadedMonsters';
import { ManageStatBlocks } from '@/Domains/StatBlocks/ManageStatBlocks';

interface Props {
  permissions: StatBlockPermissions;
}

const Index = ({ permissions }: Props) => (
  <AppLayout>
    <div className="bg-gray-100">
      <ManageStatBlocks permissions={permissions} route="monsters" type="monster" />
      <PreloadedMonsters />
    </div>
  </AppLayout>
);

export default Index;
