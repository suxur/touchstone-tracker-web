import * as React from 'react';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';

interface Props {
  active?: boolean;
  filled: boolean;
  onClick(): void;
}

export const Bean = ({ active, filled, onClick }: Props) => {
  // const { active, count, setCount } = useContext(CounterContext);

  const filledClass = useMemo(() => {
    if (filled) {
      if (active) {
        return 'bg-purple-700';
      }
      return 'bg-gray-700';
    }
  }, [active, filled]);

  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-full h-4 w-4 border mr-1 cursor-pointer',
        active ? 'border-purple-800' : 'border-gray-900',
        filledClass
      )}
    />
  );
};
