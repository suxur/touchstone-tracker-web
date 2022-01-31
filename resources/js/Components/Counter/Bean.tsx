import * as React from 'react';
import { useMemo } from 'react';
import clsx from 'clsx';

interface Props {
  active?: boolean;
  filled: boolean;

  onClick(): void;
}

export const Bean = ({ active, filled, onClick }: Props) => {
  const filledClass = useMemo(() => {
    if (filled) {
      return active ? 'bg-purple-700' : 'bg-gray-700';
    }

    return '';
  }, [active, filled]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-full h-4 w-4 border mr-1 cursor-pointer',
        active ? 'border-purple-800' : 'border-gray-900',
        filledClass,
      )}
    />
  );
};
