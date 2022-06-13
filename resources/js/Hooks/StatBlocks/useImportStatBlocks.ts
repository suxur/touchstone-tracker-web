import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import useRoute from "@/Hooks/useRoute";
import { StatBlockType } from "@/types";

interface Props {
  data: {
    file: FileList;
    collection: string;
  }
}

export const useImportStatBlocks = (type: StatBlockType) => {
  const route = useRoute();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data }: Props) => {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('collection', data.collection);

      return axios.post(route("api.stat-blocks.import"), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
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
