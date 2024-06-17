import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import { IndexPage } from './pages/IndexPage/IndexPage.tsx'
import { pages } from './data/pages.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/index.html",
    element: <IndexPage />,
  },
  ...pages.map(page => ({ path: page.href, element: page.element }))
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
