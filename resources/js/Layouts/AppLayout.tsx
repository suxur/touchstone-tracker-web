import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import Nav from './Nav/Nav';
import { Head } from '@inertiajs/inertia-react';

interface Props {
  title?: string;
  renderHeader?(): JSX.Element;
}

export const AppLayout = ({ children, title, renderHeader }: PropsWithChildren<Props>) => (
  <div className="h-full flex flex-grow flex-col bg-gray-100">
    <Head title={title || 'Touchstone'} />
    <Nav />
    {renderHeader ? (
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderHeader()}
        </div>
      </header>
    ) : null}
    <main className="h-full w-full mx-auto">
      {children}
    </main>
  </div>
);
