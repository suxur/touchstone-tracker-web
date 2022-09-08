import axios from "axios";
import { useQuery } from "react-query";

import { PaginationFor, StatBlock  } from "@/types";
import useRoute from "@/Hooks/useRoute";

interface Props {
  page: number;
}

export const usePreloadedMonsters = ({ page }: Props) => {
  const route = useRoute();

  return useQuery<PaginationFor<StatBlock>>(
    ["preloaded", page],
    async () => {
      const { data } = await axios.get(
        route(`api.preloaded-monsters.index`, { page })
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};
