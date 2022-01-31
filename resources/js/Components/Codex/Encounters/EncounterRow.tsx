import * as React from 'react';
import { Link } from '@inertiajs/inertia-react';

import { CodexEncounter, VoidFn } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { DeleteButton } from '@/Components/Button/DeleteButton';

type Props = {
  activeEncounterId?: number;
  encounter: CodexEncounter;
  onDelete: VoidFn;
};

export const EncounterRow = ({ activeEncounterId, encounter, onDelete }: Props) => {
  const route = useRoute();

  return (
    <div className="grid grid-cols-12 gap-2 col-span-12 px-6 py-4 hover:bg-gray-200 odd:bg-white even:bg-gray-50" key={encounter.id}>
      <Link className="col-span-11 flex flex-col group" href={route('encounter.owner', { slug: encounter.slug })}>
        <span className="font-bold text-purple-600 group-hover:text-purple-700">
          {encounter.slug}
        </span>
        <span className="text-sm text-gray-500">
          {encounter.created_at_diff}
        </span>
      </Link>
      {encounter.id !== activeEncounterId && (
        <div className="col-span-1">
          <div className="flex h-full justify-end items-center">
            <DeleteButton onClick={onDelete} />
          </div>
        </div>
      )}
    </div>
  );
};
