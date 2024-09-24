import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SslCheckerContextProvider from "./contexts/ssl-checker.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              <SslCheckerContextProvider>
                <Home />
              </SslCheckerContextProvider>
            }
          />
        </Routes>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
