import { useNavigate } from 'react-router-dom'
import kakao from '../assets/splash/Kakao.svg'
import useAuthStore from '../store/UseAuthStore'

export default function SocialKakao() {
  const { setLoggedIn, setShowSplash } = useAuthStore()
  const navigate = useNavigate()

  const Rest_api_key = import.meta.env.VITE_APP_KAKAO_LOGIN_REST_API_KEY //REST API KEY
  const redirect_uri = import.meta.env.VITE_APP_KAKAO_LOGIN_RETURN_URL //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  // 로그인 성공 시 상태 업데이트 (가상 처리)
  const simulateLoginSuccess = () => {
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true') // 로컬 스토리지에 로그인 상태 저장
      localStorage.setItem(
        'accessToken',
        'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlZWppbjA5NEBuYXZlci5jb20iLCJpYXQiOjE3MzIzOTQ2NjIsImV4cCI6MTczMjQyNjE5OH0.m7WwKL2IrmdcSXA9lHAvnJyRC0CseRUSYpBwhlJ1HWk'
      )
      setLoggedIn(true) // Zustand 상태 업데이트
      setShowSplash(false) // 스플래시 숨기기

      // 상태 업데이트 후 라우팅
      setTimeout(() => {
        navigate('/') // 메인 페이지로 이동
        location.reload()
      }, 0)
    }, 2000)
  }

  return (
    <>
      <button
        onClick={handleLogin}
        className="py-4 px-[75px] bg-[#F9E000] border border-[#B67F00] rounded-md"
      >
        <img src={kakao} alt="Kakao Logo" />
      </button>
      <button
        onClick={simulateLoginSuccess} // 테스트용 가상 로그인
        className="mt-4 font-SB00 text-sm text-white underline"
      >
        로그인 성공 시뮬레이션
      </button>
    </>
  )
}
