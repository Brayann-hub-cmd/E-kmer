
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'auth/register',
      element: <SignUp />
    }
  ])

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )

}

export default App;