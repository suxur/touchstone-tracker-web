import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { MonsterPermissions, Pagination, StatBlock } from '@/types';
import { ManageMonsters } from '@/Domains/Monsters/ManageMonsters';
import { PreloadedMonsters } from '@/Domains/Monsters/PreloadedMonsters';

type Props = {
  monsters: StatBlock[];
  preloaded: Pagination<StatBlock>
  permissions: MonsterPermissions;
};

const Index = ({ monsters, preloaded, permissions }: Props) => (
  <AppLayout>
    <ManageMonsters monsters={monsters} permissions={permissions} />
    <PreloadedMonsters preloaded={preloaded} />
  </AppLayout>
);

export default Index;
