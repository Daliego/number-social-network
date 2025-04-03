import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import { axiosConfig } from "../services/apiService/axiosConfig/client";
import { LOGIN_PATH } from "../constants/paths";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosConfig.post(
        LOGIN_PATH,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response);

      if (response.status !== 200) {
        throw new Error(response.data);
      }

      return response.data;
    },
    onError: async (error: AxiosError) => {
      switch (error.response?.status) {
        case 401:
          console.log("entered here");
          toast.error("Email e/ou senha inválidos.", {
            duration: 2000,
            id: "credentials",
          });
          return;
        case 500:
          toast.error("Erro ao conectar ao servidor \n Tente novamente.", {
            duration: 2000,
            id: "server",
          });
          return;
        default:
          toast.error("Algo deu errado.", { duration: 2000, id: "geral" });
          return;
      }
    },
    onMutate: async () => {
      toast.loading("Autenticando...", { id: "loading" });
    },
    onSettled: () => {
      toast.dismiss("loading");
      queryClient.invalidateQueries();
    },

    onSuccess: async (data) => {
      // TODO: verificar se o user esta sendo retornado nessa data
      const { data: credentialsData } = data;

      console.log("values", {
        user: credentialsData.user,
        access_token: credentialsData.accessToken,
        refresh_token: credentialsData.refreshToken,
      });

      secureLocalStorage.setItem("user", credentialsData.user);
      secureLocalStorage.setItem("access_token", credentialsData.accessToken);
      secureLocalStorage.setItem("refresh_token", credentialsData.refreshToken);

      toast.success("Login feito com sucesso.", {
        duration: 2000,
        id: "success",
      });

      navigate("/")
    },
  });
}

export default useLogin;
