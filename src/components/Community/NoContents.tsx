import React from 'react'
import ieum from '../../assets/splash/preparing_ieum.svg'

const subjects = {
  my_post: '앗 작성된 글이 없어요!',
  commented: '댓글을 단 게시글이\n 없어요!',
  liked: '좋아요 누른 글이\n 없어요!',
  store: '앗 1km 내에 \n존재하는 가맹점이 없어요!',
  address: '앗 설정된 주소가 없어요!',
}

const NoContents: React.FC<{ subjectKey?: keyof typeof subjects }> = ({
  subjectKey,
}) => {
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="flex flex-col items-center justify-center gap-[61px] mt-[148px]">
        <p className="font-B00 text-[26px] text-center text-800 leading-140 font-medium whitespace-pre-wrap">
          {subjectKey ? subjects[subjectKey] : ''}
        </p>
        <img src={ieum} alt="이음_프로필" />
      </div>
    </div>
  )
}

export default NoContents
