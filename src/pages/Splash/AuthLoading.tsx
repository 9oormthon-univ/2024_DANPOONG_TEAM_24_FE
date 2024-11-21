import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import loading from '../../assets/splash/loading.gif'
import ieum from '../../assets/splash/ieum.svg'
import useAuth from '../../hooks/Auth/UseAuth'

export default function AuthLoading() {
  const navigate = useNavigate()
  const { isLoading, isError, errorMessage, accessToken } = useAuth()

  useEffect(() => {
    if (accessToken) {
      navigate('/') // 액세스 토큰이 있으면 메인 페이지로 이동
    }
  }, [accessToken, navigate])

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white items-center">
        <div className="absolute bottom-0 flex flex-col items-center">
          <div className="flex flex-col items-center gap-2">
            <p className="font-B00 text-[26px] text-center text-800 leading-140 font-medium">
              잠시만 기다려주세요
            </p>
            <p className="font-M00 text-base text-center text-400 leading-135 font-normal">
              로그인 중이에요
            </p>
          </div>
          <img
            src={loading}
            alt="loading"
            className="w-[134px] h-[134px] mt-[45.12px] mb-[14px]"
          />
          <img src={ieum} alt="이음" className="mb-[-31.5px] z-10" />
          <div className="w-[390px] h-[115px] bg-Main2"></div>
        </div>
      </div>
    )
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
