import React, { FC } from "react";
import { useQuery } from "react-query";
import { routes } from '../../../constants';
import { NoResults } from '../NoResults';

type Props = {};

interface CodexEncounter {
  id: number;
  slug: string;
  created_at_diff: string;
}

export const Encounters: FC<Props> = (props) => {
  const { isFetching, error, data } = useQuery<CodexEncounter[]>(routes.CODEX_ENCOUNTERS);

  if (data) {
    return (
      <>
        {data.map(encounter => (
          <div className="grid grid-cols-12 gap-2 col-span-12 px-6 py-4" key={encounter.id}>
            <a className="col-span-11 flex flex-col group">
              <span className="font-bold text-purple-600 group-hover:text-purple-700">
                {encounter.slug}
              </span>
              <span className="text-sm text-gray-500">
                {encounter.created_at_diff}
              </span>
            </a>
            <div className="col-span-1">
              <div className="flex h-full justify-end items-center">
                {/*<delete-button @click="removeConfirm(encounter)"></delete-button>*/}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  // if (data && data.length === 0) {
  //   return <NoResults />;
  // }

  return <div className="h-32 loading-dark" />;
};
