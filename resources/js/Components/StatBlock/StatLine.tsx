import * as React from 'react';

interface Props {
  title: string;
  stat?: string | number | null;
}

export const StatLine = ({ title, stat }: Props) => {
  if (!stat) {
    return null;
  }

  return (
    <p className="font-bold">{title}: <span className="font-normal">{stat}</span></p>
  );
};
