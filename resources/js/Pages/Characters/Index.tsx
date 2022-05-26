import * as React from 'react';

import { AppLayout } from '@/Layouts/AppLayout';
import { StatBlockPermissions } from '@/types';
import { ManageStatBlocks } from '@/Domains/StatBlocks/ManageStatBlocks';

type Props = {
  permissions: StatBlockPermissions;
};

const Index = ({ permissions }: Props) => (
  <AppLayout>
    <ManageStatBlocks permissions={permissions} type="character" />
  </AppLayout>
);

export default Index;
