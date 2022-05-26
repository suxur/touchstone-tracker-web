import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Pagination as PaginationType, VoidFn } from '@/types';
import { JetTransparentButton } from './Jetstream/TransparentButton';

interface Props<T> {
  pagination: PaginationType<T>;
  next: VoidFn;
  prev: VoidFn;
}

export const Pagination = <T, >({ pagination, next, prev }: Props<T>) => {
  const { current_page, last_page, to, from, total } = pagination;

  const isFirstPage = () => current_page === 1;
  const isLastPage = () => last_page === current_page;

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
            <JetTransparentButton
              onClick={prev}
              disabled={isFirstPage()}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon icon="chevron-left" className="h-5 w-5" aria-hidden="true" />
            </JetTransparentButton>
            <JetTransparentButton
              onClick={next}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled={isLastPage()}
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon="chevron-right" className="h-5 w-5" aria-hidden="true" />
            </JetTransparentButton>
          </div>
        </div>
      </div>
    </div>
  );
};
