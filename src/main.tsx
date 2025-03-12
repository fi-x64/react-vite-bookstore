import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import "styles/global.scss"
import Layout from "@/layout"
import BookPage from 'pages/client/book';
import AboutPage from 'pages/client/about';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/book",
        element: <BookPage />,
      },
      {
      path: "/",
        element: <AboutPage />,
      },
    ]
  },
  {
    path: "/login",
    element: <div>login page</div>,
  }, {
    path: "/register",
    element: <div>register page</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
