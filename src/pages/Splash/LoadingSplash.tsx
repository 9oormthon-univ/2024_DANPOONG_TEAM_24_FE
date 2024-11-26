import React from 'react'
import loading from '../../assets/splash/loading.gif'

const LoadingSplash: React.FC = () => {
  return (
    <div className="flex flex-col bg-white items-center h-screen">
      <div className="flex flex-col items-center my-[218px]">
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
          className="w-[134px] h-[134px] mt-[49.12px]"
        />
      </div>
    </div>
  )
}

export default LoadingSplash
