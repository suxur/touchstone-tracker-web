import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { VoidFn } from '@/types';

interface Props {
  as?: string;
  href?: string;
  onClick?: VoidFn;
}

export const JetDropdownLink = ({ as, href, children, onClick }: PropsWithChildren<Props>) => (
  <>
    {(() => {
      switch (as) {
        case 'button':
          return (
            <button
              type="button"
              className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
              onClick={onClick}
            >
              {children}
            </button>
          );
        case 'a':
          return (
            <a
              href={href}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
            >
              {children}
            </a>
          );
        default:
          return (
            <Link
              href={href || ''}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
            >
              {children}
            </Link>
          );
      }
    })()}
  </>
);
