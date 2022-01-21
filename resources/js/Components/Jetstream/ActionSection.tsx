import * as React from 'react';
import { PropsWithChildren, ReactElement } from 'react';
import { JetSectionTitle } from './SectionTitle';

interface Props {
  title: string;
  description: string;
  actions?: JSX.Element;
}

export const JetActionSection = ({ title, description, children, actions }: PropsWithChildren<Props>) => (
  <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-row justify-between items-end">
      <JetSectionTitle title={title} description={description} />
      {actions}
    </div>
    <div className="mt-4 px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">
      {children}
    </div>
  </div>
);
