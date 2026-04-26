
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Userventes from "./pages/Userventes";
import MesAchats from "./pages/MesAchats";
import Favoris from "./pages/Favoris";
import UserSettings from "./pages/UserSettings";
import PublishPage from "./pages/PublishPage";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "auth/register",
    element: <SignUp />,
  },
  {
    path: "/vendre",
    element: <Userventes />,
  },
  {
    path: "/achats",
    element: <MesAchats />,
  },
  {
    path: "/favoris",
    element: <Favoris />,
  },
  {
    path: "/settings",
    element: <UserSettings />,
  },
  {
    path: "/publier",
    element: <PublishPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;