import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { ManageCharacters } from '@/Domains/Characters/ManageCharacters';
import { CharacterPermissions, StatBlock } from '@/types';

type Props = {
  characters: StatBlock[];
  permissions: CharacterPermissions;
};

const Index = ({ characters, permissions }: Props) => {
  return (
    <AppLayout>
      <ManageCharacters characters={characters} permissions={permissions} />
    </AppLayout>
  );
};

export default Index;