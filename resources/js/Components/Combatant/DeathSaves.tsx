import * as React from 'react';
import clsx from 'clsx';

import { Counter } from '@/Components/Counter/Counter';
import { Combatant } from '@/types';

type Props = {
  active?: boolean;
  combatant: Combatant;
};

export const DeathSaves = ({ active, combatant }: Props) => (
  <div className="flex items-center flex-col text-sm">
    <div className={clsx('bg-gray-100 rounded-md p-2 text-sm flex justify-center items-center flex-col', { 'bg-purple-400': active })}>
      <div className="flex w-full justify-between items-center mb-1">
        <p className="w-1/2 justify-end mr-2">
          Successes
        </p>
        <div className="w-full flex justify-between w-1/2">
          <Counter active={active} combatant={combatant} type="success" />
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <p className="w-1/2 justify-end mr-2">
          Failures
        </p>
        <div className="flex justify-between w-1/2">
          <Counter active={active} combatant={combatant} type="failure" />
        </div>
      </div>
    </div>
    <p className="mt-1">Death Saves</p>
  </div>
);
