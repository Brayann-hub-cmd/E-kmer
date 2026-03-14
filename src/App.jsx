
import Home from "./Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  // const router = createBrowserRouter([
  //   {
  //     path:'/',
  //     element:<Login />
  //   },
  //   {
  //     path:'auth/register',
  //     element:<SignUp />
  //   }
  // ])

  // return <RouterProvider router={router}/>

  return <Home/>
  

}

export default App;