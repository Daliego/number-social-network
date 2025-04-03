import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IPublication, } from "../../models/Publication";
import { PUBLICATION } from "../../services/apiService/endpoints/publication";

function useCreatePublication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IPublication) => {
      const response = await PUBLICATION.create(data);

      return response.data;
    },
    onError: async (error: AxiosError) => {
      if (error.message) {
        toast.error(error.message, {
          duration: 2000,
          id: "credentials",
        });
        return;
      }

      toast.error("Algo deu errado", {
        duration: 2000,
        id: "geral",
      });
    },
    onMutate: async () => {
      toast.loading("Crianto publicação...", { id: "loading" });
    },
    onSettled: () => {
      toast.dismiss("loading");
      queryClient.invalidateQueries();
    },

    onSuccess: async () => {
      toast.success("Publicação criada com sucesso", {
        duration: 2000,
        id: "success",
      });
    },
  });
}

export default useCreatePublication;
