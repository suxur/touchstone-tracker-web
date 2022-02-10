import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { StatBlock, StatBlockPermissions } from '@/types';
import { ManageStatBlocks } from '@/Domains/StatBlocks/ManageStatBlocks';

type Props = {
  characters: StatBlock[];
  permissions: StatBlockPermissions;
};

const Index = ({ characters, permissions }: Props) => (
  <AppLayout>
    <ManageStatBlocks statBlocks={characters} permissions={permissions} type="character" />
  </AppLayout>
);

export default Index;
