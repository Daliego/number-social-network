import { Theme } from "./layouts/theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage } from "./screens/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HashRouter } from "react-router-dom"; // Note 1
import { PublicationsPage } from "./screens/publications";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => {
      return <PublicationsPage />;
    },
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <HashRouter>
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }}
            position="top-center"
          />
        </HashRouter>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
