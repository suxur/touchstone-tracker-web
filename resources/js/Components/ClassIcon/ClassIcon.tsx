import * as React from 'react';
import clsx from 'clsx';

import { Classes } from '@/types';

type Props = {
  icon: Classes;
  size?: 'sm' | 'md' | 'lg'
};

export const ClassIcon = ({ icon, size = 'md' } : Props) => (
  <div
    className={clsx(
      'flex justify-center items-center bg-purple-200 rounded-full p-4text-purple-500',
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
      size === 'sm' ? 'w-8 h-8 text-xl' : '',
      size === 'md' ? 'w-12 h-12 text-3xl' : '',
      size === 'lg' ? 'w-20 h-20 text-5xl' : '',
    )}
  >
    <i className={`icon-${icon}`} />
  </div>
);
