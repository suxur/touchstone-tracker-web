import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Pagination, StatBlock, StatBlockPermissions } from '@/types';
import { PreloadedMonsters } from '@/Domains/Monsters/PreloadedMonsters';
import { ManageStatBlocks } from '@/Domains/StatBlocks/ManageStatBlocks';

type Props = {
  monsters: StatBlock[];
  preloaded: Pagination<StatBlock>
  permissions: StatBlockPermissions;
};

const Index = ({ monsters, preloaded, permissions }: Props) => (
  <AppLayout>
    <div className="bg-gray-100">
      <ManageStatBlocks statBlocks={monsters} permissions={permissions} type="monster" />
      <PreloadedMonsters preloaded={preloaded} />
    </div>
  </AppLayout>
);

export default Index;
