import * as React from 'react';
import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spell } from '@/types';
import { StatLine } from '@/Components/StatBlock/StatLine';
import { Divider } from '@/Components/StatBlock/Divider';

interface Props {
  spell: Spell;
}

export const SpellBlock = forwardRef<HTMLButtonElement, Props>(({ spell }: Props, ref) => (
  <div
    className="bg-white rounded-md border-t-4 border-b-4 border-purple-400 h-full filter drop-shadow flex flex-grow overflow-hidden flex-col absolute inset-0 z-20"
  >
    <div className="relative px-4 pt-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-bold">{spell.name}</p>
        <button
          ref={ref}
          className="relative rounded-full flex flex-shrink-0 justify-center items-center bg-red-200 text-red-400 h-6 w-6"
        >
          <FontAwesomeIcon icon="times" className="stat-block-close" />
        </button>
      </div>
      <p className="italic">{spell.level}, {spell.school}
        {spell.is_ritual && <span>(ritual)</span>}
      </p>
    </div>
    <Divider />
    <div className="flex flex-col overflow-auto relative h-full">
      <div className="absolute inset-0">
        <div className="p-4 pt-0">
          <StatLine title="Casting Time" stat={spell.casting_time} />
          <StatLine title="Range" stat={spell.range} />
          <p className="flex-row">
            <span className="font-bold">Components: </span>
            {spell.components}
            <span className="flex-1 flex-wrap">
              {spell.material && (
              <> ({spell.material})</>
              )}
            </span>
          </p>
          {spell.duration && (
            <p>
              <span className="font-bold">Duration: </span>
              {spell.requires_concentration && (
                <span>Concentration, </span>
              )}
              {spell.duration}
            </p>
          )}
          <Divider />
          <div className="pb-2">
            <ReactMarkdown>
              {spell.description}
            </ReactMarkdown>
          </div>
          {spell.higher_level && (
            <div className="pb-2">
              <p>
                <span className="font-bold italic">At Higher Levels. </span>
                <br />
                {spell.higher_level}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
));
