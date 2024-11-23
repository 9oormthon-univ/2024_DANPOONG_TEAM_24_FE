import { Outlet } from 'react-router-dom'
import Splash from '../pages/Splash/Splash'

function ProtectedRoute() {
  const accessToken = localStorage.getItem('accessToken')

  // accessToken이 있으면 접근 허용
  if (accessToken) {
    return <Outlet />
  }

  // accessToken 없으면 스플래시 화면으로 이동
  return <Splash />
}

export default ProtectedRoute
