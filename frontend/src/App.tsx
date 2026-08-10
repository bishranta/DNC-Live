import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { useRealtimeSync } from "./hooks/useRealtimeSync";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { SessionDetail } from "./pages/SessionDetail";
import { Feedback } from "./pages/Feedback";
import { Questions } from "./pages/Questions";
import { Gate } from "./pages/Gate";
import { participantCodeStorage } from "./lib/storage";

function AppRoutes() {
  useRealtimeSync();
  const [code, setCode] = useState(participantCodeStorage.get);

  if (!code) return <Gate onUnlock={setCode} />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="session/:id" element={<SessionDetail />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="questions" element={<Questions />} />
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
