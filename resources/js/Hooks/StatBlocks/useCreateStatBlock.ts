import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import useRoute from "@/Hooks/useRoute";
import { FormProps } from "../useStatBlockForm";
import {StatBlockType} from "@/types";

export const useCreateStatBlock = (type: StatBlockType) => {
  const route = useRoute();
  const queryClient = useQueryClient();

  return useMutation(
    (data: FormProps) =>
      axios.post(route("api.stat-blocks.store"), { ...data }),
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
