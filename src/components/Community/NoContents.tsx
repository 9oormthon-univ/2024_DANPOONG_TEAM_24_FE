import React from 'react'
import ieum from '../../assets/splash/preparing_ieum.svg'

const NoContents: React.FC<{ store?: boolean }> = ({ store }) => {
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="flex flex-col items-center justify-center gap-[61px] mt-[148px]">
        <p className="font-B00 text-[26px] text-center text-800 leading-140 font-medium whitespace-pre-wrap">
          {store
            ? '앗 1km 내에 \n존재하는 가맹점이 없어요!'
            : '앗 작성된 글이 없어요!'}
        </p>
        <img src={ieum} alt="이음_프로필" />
      </div>
    </div>
  )
}

export default NoContents
