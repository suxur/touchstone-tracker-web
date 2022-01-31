import * as React from 'react';
import { useMemo } from 'react';
import { ROUND_TIME } from '@/constants';

interface Props {
  rounds: number;
}

export const GameTime = ({ rounds }: Props) => {
  const time = useMemo(() => {
    const totalSeconds = rounds * ROUND_TIME;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 3600 % 60);
    return { hours, minutes, seconds };
  }, [rounds]);

  return (
    <span className="font-bold text-gray-600">
      {time.hours > 0 && (
        <span className="mr-1">
        {time.hours}
          h
      </span>
      )}
      {time.minutes > 0 && (
        <span className="mr-1">
          {time.minutes}
          m
        </span>
      )}
      <span>
        {time.seconds}
        s
      </span>
    </span>
  );
};
