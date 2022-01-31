import * as React from 'react';

import { VoidFn } from '@/types';
import { ViewButton } from '@/Components/Button/ViewButton';
import { Highlighted } from '@/Components/Highlight';

interface Props {
  title: string;
  onClick: VoidFn;
  onViewClick?: VoidFn;
  highlight?: string;
}

export const CodexRow = ({ title, onClick, onViewClick, highlight = '' }: Props) => (
  <div
    className="group cursor-pointer flex flex-row justify-between items-center hover:bg-gray-200 odd:bg-white even:bg-gray-50"
  >
    <div className="flex flex-1">
      <button
        type="button"
        className="bg-transparent border-0 px-4 lg:px-6 py-4 flex flex-1"
        onClick={onClick}
      >
        <Highlighted text={title} highlight={highlight} />
      </button>
    </div>
    {onViewClick && (
    <div className="flex w-10 mr-4 lg:mr-6 justify-end">
      <ViewButton
        className="hidden group-hover:flex"
        onClick={onViewClick}
      />
    </div>
    )}
  </div>
);
