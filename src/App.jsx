import Login from "./pages/auth/Login";
import Auth from "./Auth/Auth"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login />
    },
    {
      path:'auth/register',
      element:<Auth />
    }
  ])

  return <RouterProvider router={router}/>
}

export default App;