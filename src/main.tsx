import '../src/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Information from './pages/Information.tsx'
import Address from './pages/Main/Address.tsx'

const router = createBrowserRouter([
  // 정보 페이지
  { path: '/information', element: <Information /> },
  { path: '/address', element: <Address /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>
)
