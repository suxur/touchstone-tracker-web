import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';

import { Pagination as PaginationType } from '@/types';

interface Props<T> {
  pagination: PaginationType<T>;
}

export const Pagination = <T, >({ pagination }: Props<T>) => {
  const { to, from, total } = pagination;
  return (
    <div className="bg-white py-3 flex items-center justify-between mt-8">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <div className="flex-1 flex justify-between">
            <Link
              href={pagination.prev_page_url || '#'}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon icon="chevron-left" className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href={pagination.next_page_url || '#'}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon="chevron-right" className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
