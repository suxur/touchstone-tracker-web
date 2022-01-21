import * as React from 'react';
import clsx from 'clsx';
import { Role } from '@/types';
import { CircleCheckmark } from '@/Components/Svg/CircleCheckmark';

type Props = {
  roles: Role[],
  selected?: string;
  onClick(key: string): void;
};

export const Roles = ({ roles, selected, onClick }: Props) => {
  return (
    <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
      {roles.map((role, i) => (
        <button
          key={role.key}
          type="button"
          className={clsx(
            'relative px-4 py-3 inline-flex w-full rounded-lg',
            'focus:z-10 focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50',
            {
              'border-t border-gray-200 rounded-t-none': i > 0,
              'rounded-b-none': i !== Object.keys(roles).length - 1
            }
          )}
          onClick={() => onClick(role.key)}
        >
          <div className={clsx({ 'opacity-50': selected && selected !== role.key })}>
            <div className="flex items-center">
              <div className={clsx('text-sm text-gray-600', { 'font-semibold': selected === role.key })}>
                {role.name}
              </div>
              {selected === role.key && (
                <div className="ml-2 h-5 w-5">
                  <CircleCheckmark />
                </div>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-600 text-left">
              {role.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
