import '../src/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute.tsx'
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
import Recipe from './pages/Recipe/Recipe.tsx'
import RecipeReturn from './pages/Recipe/RecipeReturn.tsx'
import AuthLoading from './pages/Splash/AuthLoading.tsx'
import PreparingSplash from './pages/Splash/PreparingSplash.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Main /> }, // 메인 페이지
      { path: 'information', element: <Information /> },
      { path: 'address', element: <Address /> },
      { path: 'around', element: <Around /> },
      { path: 'community', element: <Community /> },
      { path: 'community/write', element: <Write /> },
      { path: 'community/:postId', element: <Post /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'mypage/writtenpost', element: <WrittenPost /> },
      { path: 'mypage/commentpost', element: <CommentPost /> },
      { path: 'mypage/likepost', element: <LikePost /> },
    ],
  },
  { path: 'recipe', element: <Recipe /> },
  { path: 'recipeReturn', element: <RecipeReturn /> },
  { path: '/auth', element: <AuthLoading /> },
  { path: '/preparingSplash', element: <PreparingSplash /> },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />
)
