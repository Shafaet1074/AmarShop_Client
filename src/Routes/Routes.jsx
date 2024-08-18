import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Layouts/Home";

import Signup from "../Components/SignUp/SignUp";
import Login from "../Components/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>,
      },
      {
        path:'signup',
        element:<Signup></Signup>,
      },
    ]
  },
  
]);