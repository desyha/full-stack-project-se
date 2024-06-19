import Home from "./pages/Home/Home.jsx"
import Footer from "./components/Footer.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import ListPage from "./pages/ListPage/ListPage.jsx"
import {Layout, RequireAuth} from "./pages/Layout/Layout.jsx"
import Bengkel from "./pages/Bengkel/Bengkel.jsx"
import Register from "./pages/Register/Register.jsx"
import Login from "./pages/Login/Login.jsx"
import CreateBengkel from "./pages/CreateBengkel/Createbengkel.jsx"
import { listBengkel, profilePageLoader, singleBengkel} from "./lib/loaders.js"
import Profile from "./pages/Profile/Profile.jsx"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
          loader: listBengkel
        },
        {
          path: "/list",
          element: <ListPage/>,
          loader: listBengkel
        },
        {
          path: "/:id",
          element: <Bengkel/>,
          loader: singleBengkel
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/login",
          element: <Login/>
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children:[
        {
          path: "/createbengkel",
          element: <CreateBengkel/>
        },
        {
          path: "/profile",
          element: <Profile/>,
          loader: profilePageLoader
        }
      ]
    }
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App