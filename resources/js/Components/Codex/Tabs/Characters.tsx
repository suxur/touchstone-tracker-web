import React, { FC, useMemo } from "react";
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CLASSES } from '../../../constants';

type Props = {};

export const Characters: FC<Props> = (props) => {
  const icon = useMemo(() => {
    return CLASSES[Math.floor(Math.random() * CLASSES.length)];
  }, []);

  return (
    <>
      <div className="flex pt-16 items-center p-4 flex-col bg-white flex-grow">
        No Characters Found
        <div
          className={clsx(
            'flex justify-center items-center bg-purple-200 rounded-full w-20 h-20 p-4 m-4 text-5xl text-purple-500',
            icon === 'artificer' ? 'bg-artificer text-artificer-100' : '',
            icon === 'barbarian' ? 'bg-barbarian text-barbarian-100' : '',
            icon === 'bard' ? 'bg-bard text-bard-100' : '',
            icon === 'cleric' ? 'bg-cleric text-cleric-100' : '',
            icon === 'druid' ? 'bg-druid text-druid-100' : '',
            icon === 'fighter' ? 'bg-fighter text-fighter-100' : '',
            icon === 'monk' ? 'bg-monk text-monk-100' : '',
            icon === 'paladin' ? 'bg-paladin text-paladin-100' : '',
            icon === 'ranger' ? 'bg-ranger text-ranger-100' : '',
            icon === 'rogue' ? 'bg-rogue text-rogue-100' : '',
            icon === 'sorcerer' ? 'bg-sorcerer text-sorcerer-100' : '',
            icon === 'warlock' ? 'bg-warlock text-warlock-100' : '',
            icon === 'wizard' ? 'bg-wizard text-wizard-100' : '',
          )}
        >
          <i className={`icon-${icon}`} />
        </div>
        <button className="button">
          Add Character
        </button>
      </div>
      <button type="button" className="button button-transparent w-full mt-2">
        <FontAwesomeIcon icon="plus" />
        <span className="ml-2">New Character</span>
      </button>
    </>
  );
};
