import * as React from 'react';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { JetSectionTitle } from './SectionTitle';

interface Props {
  title: string;
  description: string;

  renderActions?(): JSX.Element;

  onSubmit(): void;
}

export const JetFormSection = ({ onSubmit, renderActions, title, description, children }: PropsWithChildren<Props>) => {
  const hasActions = !!renderActions;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-4 lg:px-6">
      <JetSectionTitle title={title} description={description} />
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className="mt-4"
      >
        <div
          className={clsx(
            'px-4 py-5 bg-white sm:p-6 shadow',
            hasActions
              ? 'sm:rounded-tl-md sm:rounded-tr-md'
              : 'sm:rounded-md',
          )}
        >
          <div className="grid grid-cols-6 gap-6">{children}</div>
        </div>

        {hasActions && (
          <div className="flex items-center py-3 bg-slate-100 text-right px-4 shadow sm:rounded-bl-md sm:rounded-br-md">
            {renderActions?.()}
          </div>
        )}
      </form>
    </div>
  );
};
