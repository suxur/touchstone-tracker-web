import * as React from 'react';
import { PropsWithChildren } from 'react';
import { JetSectionTitle } from './SectionTitle';

interface Props {
  title: string;
  description: string;
}

export const JetActionSection = ({ title, description, children }: PropsWithChildren<Props>) => (
  <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <JetSectionTitle title={title} description={description} />
    <div className="mt-4 px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">
      {children}
    </div>
  </div>
);
