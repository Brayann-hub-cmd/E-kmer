
import Login from "./pages/auth/Login";
import SignUp from "./SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login />
    },
    {
      path:'auth/register',
      element:<SignUp />
    }
  ])

  return <RouterProvider router={router}/>

}

export default App;