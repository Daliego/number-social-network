import { Theme } from "./layouts/theme";
import { HashRouter, Route, Routes } from "react-router";
import { LoginPage } from "./screens/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { PublicationsPage } from "./screens/publications";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: () => {
//       return <PublicationsPage />;
//     },
//   },
//   {
//     path: "/login",
//     Component: LoginPage,
//   },
// ]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <HashRouter basename="/">
          <Routes>
            <Route path="/" element={<PublicationsPage />} />
            <Route path="/login" element={<LoginPage />} />
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
          </Routes>
        </HashRouter>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
