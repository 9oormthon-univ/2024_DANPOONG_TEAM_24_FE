import kakao from '../assets/splash/Kakao.svg'

export default function SocialKakao() {
  const Rest_api_key = import.meta.env.VITE_APP_KAKAO_LOGIN_REST_API_KEY //REST API KEY
  const redirect_uri = import.meta.env.VITE_APP_KAKAO_LOGIN_RETURN_URL //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }
  return (
    <>
      <button
        onClick={handleLogin}
        className="py-4 px-[75px] bg-[#F9E000] border border-[#B67F00] rounded-md"
      >
        <img src={kakao} alt="Kakao Logo" />
      </button>
    </>
  )
}
