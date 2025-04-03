import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { COMMENT } from "../../services/apiService/endpoints/comment";
import { IComment } from "../../models/Comments";

function useCreateComments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IComment) => {
      const response = await COMMENT.create(data);

      return response.data;
    },
    onError: async (error: AxiosError) => {
      if (error.message) {
        toast.error(error.message, {
          duration: 2000,
          id: "COMMENTS",
        });
        return;
      }

      toast.error("Algo deu errado", {
        duration: 2000,
        id: "geral",
      });
    },
    onMutate: async () => {
      toast.loading("Criando comentário...", { id: "loading" });
    },
    onSettled: () => {
      toast.dismiss("loading");
      queryClient.invalidateQueries();
    },

    onSuccess: async () => {
      toast.success("Comment crated with success", {
        duration: 2000,
        id: "success",
      });
    },
  });
}

export default useCreateComments;
