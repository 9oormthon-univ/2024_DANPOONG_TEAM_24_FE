import SocialKakao from '../../utils/KakaoLogin'
import useAuthStore from '../../store/UseAuthStore'
import logo from '../../assets/splash/logo.gif'

export default function Splash() {
  const { isLoggedIn } = useAuthStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[390px] h-screen relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 390 844"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>
            {`
          @keyframes colorAnimation {
            0% {
              fill: #F4635E;
            }
            50% {
              fill: #FDD835;
            }
            100% {
              fill: #F4635E;
            }
          }

          .animated-bg {
            animation: colorAnimation 5s linear infinite;
          }
        `}
          </style>
          <rect className="animated-bg" width="100%" height="100%" />
          <defs>
            <linearGradient
              id="paint0_linear_16_227"
              x1="195"
              y1="0"
              x2="195"
              y2="844"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F4635E" />
              <stop offset="1" stopColor="#FDD835" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col gap-4 items-center top-[calc(50%-50px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={logo} className="w-[241px]" alt="로고" />
          <p className="text-white text-lg font-normal">
            따뜻한 한 끼를 이어주다
          </p>
        </div>

        {/* 로그인 유무에 따라 버튼 보이기 */}
        {!isLoggedIn && (
          <div className="flex flex-col mx-[19px] -mt-[200px] justify-center">
            {/* 카카오 로그인 버튼 */}
            <SocialKakao />
          </div>
        )}
      </div>
    </div>
  )
}
