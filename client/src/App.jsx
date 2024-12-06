import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
