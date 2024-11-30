import React from 'react'
import arrow from '../../assets/community/left_arrow.svg'
import ieum from '../../assets/splash/sad_ieum.svg'
import { useNavigate } from 'react-router-dom'

const PreparingSplash: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-screen bg-white items-center">
      <div className="relative w-[390px] flex items-center justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-[11px] left-[19px]"
        >
          <img src={arrow} />
        </button>
      </div>
      <div className="flex flex-col items-center mt-[218px]">
        <div className="flex flex-col items-center gap-1 mb-[48px]">
          <p className="font-B00 text-[22px] text-center text-800 leading-140 font-normal">
            앗 준비 중이에요!
          </p>
          <p className="font-M00 text-base text-center text-400 leading-135 font-normal">
            더 나은 서비스를 위해 노력할게요
          </p>
        </div>
        <img src={ieum} alt="이음" />
      </div>
    </div>
  )
}

export default PreparingSplash
