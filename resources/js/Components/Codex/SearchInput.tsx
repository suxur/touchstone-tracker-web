import * as React from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetAction } from '@/types';


interface Props {
  query: string,
  setQuery: SetAction<string>
}

const SearchInput = ({ query, setQuery }: Props) => {
  const searchInput = useRef<HTMLInputElement>(null);

  const clear = () => (setQuery(''));
  // const focusSearch = useCallback(() => {
  //   searchInput.current?.focus();
  //   // logic here
  // }, [])
  // // meta + k
  // const handlers = {
  //   SEARCH: focusSearch
  // };
  return (
    <div className="px-2 py-2 relative bg-white border-b border-gray-200">
      <div className="absolute top-0 bottom-0 left-2 w-10 py-2">
        <div className="text-gray-400 w-full h-full flex justify-center items-center">
          <FontAwesomeIcon icon="search" />
        </div>
      </div>
      <input
        ref={searchInput}
        type="search"
        placeholder="Search"
        className="form-input w-full rounded-full text-sm bg-gray-200 border-none px-6 pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute top-0 bottom-0 right-2 w-10 py-2">
        {query !== '' && (
          <button
            type="button"
            className="text-gray-400 w-full h-full flex justify-center items-center"
            onClick={clear}
          >
            <FontAwesomeIcon icon="times-circle" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
