import * as React from 'react';
import { memo, useEffect, useState } from 'react';

type Props = {
  date: string;
};

const intervals = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
};

const updateDiffs = (datetime: Date) => {
  // let's figure out our diffs
  let diff = Math.abs(Date.now() - datetime.getTime());
  const days = Math.floor(diff / intervals.day);
  diff -= days * intervals.day;
  const hours = Math.floor(diff / intervals.hour);
  diff -= hours * intervals.hour;
  const minutes = Math.floor(diff / intervals.minute);
  diff -= minutes * intervals.minute;
  const seconds = Math.floor(diff / intervals.second);
  return { days, hours, minutes, seconds };
};

export const TimeSince = memo(({ date }: Props) => {
  const [datetime] = useState(() => (date ? new Date(date) : new Date()));
  const [time, setTime] = useState(updateDiffs(datetime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(updateDiffs(datetime));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <span className="font-bold text-gray-600">
      {time.days > 0 && (
      <span className="mr-1">
        {time.days}
        d
      </span>
      )}
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
});
