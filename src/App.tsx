import { Theme } from "./layouts/theme";
import { Route, Routes } from "react-router-dom"; // Fixed import
import { HashRouter } from "react-router-dom"; // Fixed import
import { LoginPage } from "./screens/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { PublicationsPage } from "./screens/publications";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <HashRouter basename="/">
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
          <Routes>
            <Route path="/" element={<PublicationsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </HashRouter>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
