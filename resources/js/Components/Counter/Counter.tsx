import * as React from 'react';
import { createContext, useState } from 'react';
import { noop } from '../../lib/helpers';
import { Bean } from './Bean';
import { SetAction } from '@/types';

interface Props {
}

interface Context {
  active: boolean;
  count: number;
  setCount: SetAction<number>;
}

export const CounterContext = createContext<Context>({
  active: false,
  count: 0,
  setCount: noop,
});

export const Counter = (props: Props) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ active: false, count, setCount }}>
      <div className="flex justify-between w-1/2" data-testid="counter">
        <Bean index={1} />
        <Bean index={2} />
        <Bean index={2} />
        {/*<bean class="mr-1" :active="active" :count.sync="combatant.encounter_stats.death_save_failure" :index="1"></bean>*/}
        {/*<bean class="mr-1" :active="active" :count.sync="combatant.encounter_stats.death_save_failure" :index="2"></bean>*/}
        {/*  <bean :active="active" :count.sync="combatant.encounter_stats.death_save_failure" :index="3"></bean>*/}
      </div>
    </CounterContext.Provider>
  );
};
