import * as React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { User } from '@/types';
import { CreateTeamForm } from '@/Pages/Teams/Partials/CreateTeamForm';

interface Props {
  user: User;
}

const Create = ({ user }: Props) => {
  return (
    <AppLayout title="Create Team">
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 bg-gray-100">
        <CreateTeamForm user={user} />
      </div>
    </AppLayout>
  );
};

export default Create;
