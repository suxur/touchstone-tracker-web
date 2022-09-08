import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { StatBlock, StatBlockType } from "@/types";
import useRoute from "@/Hooks/useRoute";

interface Props {
  statBlock: StatBlock;
  type: StatBlockType;
}

export const useDeleteStatBlock = () => {
  const route = useRoute();
  const queryClient = useQueryClient();

  return useMutation(
    ({ statBlock }: Props) =>
      axios.delete(route("api.stat-blocks.destroy", { stat_block: statBlock })),
    {
      onMutate: ({ type }) => {
        queryClient.cancelQueries([type, 1]);
      },
      onSuccess: (_, { type }) => {
        queryClient.invalidateQueries([type, 1]);
      },
    }
  );
};
