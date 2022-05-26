import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import useRoute from "@/Hooks/useRoute";
import { FormProps } from "../useStatBlockForm";
import {StatBlock, StatBlockType} from "@/types";

interface Props {
  statBlock: StatBlock;
  data: FormProps;
}

export const useUpdateStatBlock = (type: StatBlockType) => {
  const route = useRoute();
  const queryClient = useQueryClient();

  return useMutation(
    ({ statBlock, data }: Props) =>
      axios.put(route("api.stat-blocks.update", { stat_block: statBlock }), { ...data }),
    {
      onMutate: () => {
        queryClient.cancelQueries(["stat-blocks", type]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["stat-blocks", type]);
      },
    }
  );
};
