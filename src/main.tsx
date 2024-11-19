import '../src/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Information from './pages/Information.tsx'
import Address from './pages/Main/Address.tsx'
import Around from './pages/Around.tsx'
import Community from './pages/Community/Community.tsx'
import Write from './pages/Community/Write.tsx'

const router = createBrowserRouter([
  // 정보 페이지
  { path: '/information', element: <Information /> },
  { path: '/address', element: <Address /> },
  { path: '/around', element: <Around /> },
  { path: '/community', element: <Community /> },
  { path: '/community/write', element: <Write /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>
)
