import { BrowserRouter, Route, Routes } from "react-router-dom";

import { TaskContextProvider } from "./contexts/taskContext/taskContextProvider";
import { Home } from "./pages/home";
import { History } from "./pages/history";
import { AboutPomodoro } from "./pages/aboutPomodoro";
import { NotFound } from "./pages/notFound";

export function App() {
  return (
    <TaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/about-pomodoro" element={<AboutPomodoro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TaskContextProvider>
  );
}
