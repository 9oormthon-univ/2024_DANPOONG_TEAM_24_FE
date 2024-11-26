import React from 'react'
import loading from '../../assets/splash/loading.gif'
import ieum from '../../assets/splash/ieum.svg'

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <div className="flex flex-col items-center gap-2 mt-[148px]">
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
      <img src={ieum} alt="이음" className="mb-[-31.5px] z-10" />
      <div className="w-[390px] h-[115px] bg-Main2"></div>
    </div>
  )
}

export default Loading
