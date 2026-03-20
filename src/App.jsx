import { Toaster } from "react-hot-toast";
import Home from "./Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'auth/register',
      element:<SignUp />
    },
    {
      path:'auth/login',
      element:<Login />
    }
  ])

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )

  // return <RouterProvider router={router}/>


  //   return (
  //       <div className="App">
  //           <Navbar />
  //           <Header />
  //       </div>
  //   );
}

export default App;

