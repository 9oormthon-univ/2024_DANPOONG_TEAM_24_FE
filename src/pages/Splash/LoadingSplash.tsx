import React from 'react'
import loading from '../../assets/splash/loading.gif'
import ieum from '../../assets/splash/ieum.svg'

const LoadingSplash: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white items-center">
      <div className="absolute bottom-0 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <p className="font-B00 text-[26px] text-center text-800 leading-140 font-medium">
            잠시만 기다려주세요
          </p>
          <p className="font-M00 text-base text-center text-400 leading-135 font-normal">
            열심히 내용을 불러오고 있어요
          </p>
        </div>
        <img
          src={loading}
          alt="loading"
          className="w-[134px] h-[134px] mt-[45.12px] mb-[14px]"
        />
        <img src={ieum} alt="이음" />
        <div className="w-screen h-[137px] bg-Main2"></div>
      </div>
    </div>
  )
}

export default LoadingSplash
