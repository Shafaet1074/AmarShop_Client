import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';

import './index.css'
import FirebaseProvider from './Providers/FirebaseProvider';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
    <RouterProvider router={router} />
    </FirebaseProvider>
    <ToastContainer/>
  </StrictMode>,
)
