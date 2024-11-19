import '../src/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Information from './pages/Information.tsx'
import Address from './pages/Main/Address.tsx'
import Community from './pages/Community/Community.tsx'
import Write from './pages/Community/Write.tsx'
import Post from './pages/Community/Post.tsx'

const router = createBrowserRouter([
  // 정보 페이지
  { path: '/information', element: <Information /> },
  { path: '/address', element: <Address /> },
  { path: '/community', element: <Community /> },
  { path: '/community/write', element: <Write /> },
  { path: '/community/:postId', element: <Post /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>
)
