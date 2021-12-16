import * as React from 'react';
import clsx from 'clsx';
import { useCallback, useContext, useMemo } from 'react';
import { CounterContext } from './Counter';

interface Props {
  index: number;
}

export const Bean = ({ index }: Props) => {
  const { active, count, setCount } = useContext(CounterContext);

  const filled = useMemo(() => {
    if (count >= index) {
      if (active) {
        return 'bg-purple-800';
      }

      return 'bg-gray-700';
    }

    return '';
  }, [active, count, index]);

  const toggle = useCallback(() => {

    let current = count;
    if (index === 1 && count > 1) {
      current = 0;
    } else if (index === count) {
      --current;
    } else {
      current = index;
    }

    setCount(current);
  }, [count, index, setCount]);

  return (
    <div
      onClick={toggle}
      className={clsx(
        'rounded-full h-4 w-4 border border-gray-900 mr-1 cursor-pointer',
        filled
      )}
      data-testid={`bean-${index}`}
    />
  );
};
