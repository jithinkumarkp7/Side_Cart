import { BrowserRouter } from "react-router-dom";
import { appRoutes } from "@/routes/routes";
import { useRoutes } from "react-router-dom";

function AppRoutes() {
  return useRoutes(appRoutes);
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
