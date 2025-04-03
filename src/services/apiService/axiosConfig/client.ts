// TODO: the get token function should be in the apiService
// import { getTokens } from "@/actions/auth/get-tokens";
import { useNavigate } from "react-router";
import { getTokens } from "../../../../utils/@shared/functions";
import { API_URL } from "../../../constants/paths";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: `${API_URL}`,
});

instance.interceptors.request.use(
  async (config) => {
    const { access_token } = await getTokens();
    if (!access_token) {
      return config;
    }

    config.headers["Authorization"] = "Bearer " + access_token;

    return config;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        const navigate = useNavigate();
        toast.error("Unauthorized access - redirecting to login", {
          duration: 2000,
          id: "unauthorized",
        });

        setTimeout(() => navigate("/login"), 2000);
        console.error("Unauthorized access - redirecting to login");
      }
    }

    return Promise.reject(new Error("Erro: " + error.message));
  }
);

export { instance as axiosConfig };
