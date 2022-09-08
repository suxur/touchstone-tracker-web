import axios from "axios";
import { useQuery } from "react-query";

import { PaginationFor, StatBlock, StatBlockRouteType } from "@/types";
import useRoute from "@/Hooks/useRoute";

interface Props {
  type: StatBlockRouteType;
  page: number;
}

export const useStatBlockPagination = ({ type, page }: Props) => {
  const route = useRoute();

  return useQuery<PaginationFor<StatBlock>>(
    [type, page],
    async () => {
      const { data } = await axios.get(
        route(`api.${type}.index`, { page })
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};
