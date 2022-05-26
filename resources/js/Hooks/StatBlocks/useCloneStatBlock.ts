import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { StatBlock, StatBlockType } from "@/types";
import useRoute from "@/Hooks/useRoute";

interface Props {
  statBlock: StatBlock;
  type: StatBlockType;
}

export const useCloneStatBlock = () => {
  const route = useRoute();
  const queryClient = useQueryClient();

  return useMutation(
    ({ statBlock, type }: Props) =>
      axios.post(route("stat_block.clone", { stat_block: statBlock, type })),
    {
      onMutate: ({ type }) => {
        queryClient.cancelQueries(["stat-blocks", type]);
      },
      onSuccess: (_, { type }) => {
        queryClient.invalidateQueries(["stat-blocks", type]);
      },
    }
  );
};
