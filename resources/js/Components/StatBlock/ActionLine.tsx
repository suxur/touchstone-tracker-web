import * as React from 'react';
import { Action } from '@/types';

interface Props {
  action: Action;
}

export const ActionLine = ({ action }: Props) => (
  <div className="pb-2">
    <p className="font-bold">{action.name}</p>
    <p>{action.description}</p>
  </div>
);


