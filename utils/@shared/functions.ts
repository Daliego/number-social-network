import secureLocalStorage from "react-secure-storage";

export const createNetworkError = (): any => ({
  error: "Network Error",
  message: [
    {
      context: "Network Error",
      error: "Network Error",
      message: "Erro ao tentar se conectar ao servidor",
      statusCode: 500,
    },
  ],
  statusCode: 500,
});

export async function getTokens() {
  const access_token = secureLocalStorage.getItem("access_token");
  const refresh_token = secureLocalStorage.getItem("refresh_token");

  console.log("tokens when not logged", {
    access_token,
    refresh_token,
  });

  return { access_token, refresh_token } as {
    access_token: string | null;
    refresh_token: string | null;
  };
}
