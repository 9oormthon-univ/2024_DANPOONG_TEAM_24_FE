import '../src/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Main from './pages/Main/Main.tsx'
import Information from './pages/Information.tsx'
import Address from './pages/Main/Address.tsx'
import Around from './pages/Around.tsx'
import Community from './pages/Community/Community.tsx'
import Write from './pages/Community/Write.tsx'
import Post from './pages/Community/Post.tsx'
import MyPage from './pages/Mypage/MyPage.tsx'
import WrittenPost from './pages/Mypage/WrittenPost.tsx'
import CommentPost from './pages/Mypage/CommentPost.tsx'
import LikePost from './pages/Mypage/LikePost.tsx'
import ComingSoon from './pages/Mypage/ComingSoon.tsx'


const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/information', element: <Information /> },
  { path: '/address', element: <Address /> },
  { path: '/around', element: <Around /> },
  { path: '/community', element: <Community /> },
  { path: '/community/write', element: <Write /> },
  { path: '/community/:postId', element: <Post /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/mypage/writtenpost', element: <WrittenPost /> },
  { path: '/mypage/commentpost', element: <CommentPost /> },
  { path: '/mypage/likepost', element: <LikePost /> },
  { path: '/mypage/comingsoon', element: <ComingSoon /> },


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>
)
