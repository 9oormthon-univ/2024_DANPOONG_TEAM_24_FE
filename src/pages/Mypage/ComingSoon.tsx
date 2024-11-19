import Character from '../../assets/mypage/Character.svg'
import { useNavigate } from 'react-router-dom'

const ComingSoon = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <img src={Character} alt="Coming Soon" className="mb-5 w-32 h-32" />
          <p className="text-2xl font-SB00 text-gray-700 mb-5">페이지 준비 중입니다...</p>
          <button
            className="bg-100 text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
            type="button"
            onClick={() => navigate(-1)}
          >
            <div className="bg-point1 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                height="25px"
                width="25px"
              >
                <path
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  fill="#FFFFFF"
                ></path>
              </svg>
            </div>
            <p className="ml-6 translate-x-2 font-R00 text-500">뒤로 가기</p>
          </button>
        </div>
      );
    };

export default ComingSoon;