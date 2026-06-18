import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { useRealtimeSync } from "./hooks/useRealtimeSync";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { SessionDetail } from "./pages/SessionDetail";
import { Feedback } from "./pages/Feedback";

function AppRoutes() {
  useRealtimeSync();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="session/:id" element={<SessionDetail />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
