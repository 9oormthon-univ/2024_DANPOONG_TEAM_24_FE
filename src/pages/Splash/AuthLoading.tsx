import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/Auth/UseAuth'
import LoadingSplash from './LoadingSplash'

export default function AuthLoading() {
  const navigate = useNavigate()
  const { isLoading, isError, errorMessage, accessToken } = useAuth()

  useEffect(() => {
    if (accessToken) {
      navigate('/') // 액세스 토큰이 있으면 메인 페이지로 이동
    }
  }, [accessToken, navigate])

  if (isLoading) {
    return <LoadingSplash />
  }

  if (isError) {
    return (
      <div className="flex flex-col h-screen bg-white items-center">
        <div className="absolute bottom-0 flex flex-col items-center">
          <p className="font-B00 text-[26px] text-center text-800 leading-140 font-medium">
            로그인 오류
          </p>
          <p className="font-M00 text-base text-center text-400 leading-135 font-normal">
            {errorMessage}
          </p>
        </div>
      </div>
    )
  }

  return null
}
