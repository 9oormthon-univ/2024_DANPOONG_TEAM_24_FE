import React from 'react'
import ieum from '../../assets/splash/sad_ieum.svg'

interface TextInterface {
  main: string
  sub: string
}

const subjects: Record<string, TextInterface> = {
  my_post: {
    main: '앗 작성된 글이 없어요!',
    sub: '커뮤니티에 레시피를 공유해보세요',
  },
  commented: {
    main: '앗 댓글을 단 글이 없어요!',
    sub: '커뮤니티 글에 의견을 남겨보세요',
  },
  liked: {
    main: '앗 좋아요 누른 글이 없어요!',
    sub: '커뮤니티 글에 공감해보세요',
  },
  store: {
    main: '앗 1km 내에 존재하는 가맹점이 없어요!',
    sub: '위치를 다시 설정해주세요',
  },
  address: {
    main: '앗 설정된 주소가 없어요!',
    sub: '위치를 다시 설정해주세요',
  },
}

const NoContents: React.FC<{ subjectKey?: keyof typeof subjects }> = ({
  subjectKey,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-1 mt-[148px] ">
        <p className="font-B00 text-[22px] text-center text-800 leading-140 font-medium whitespace-pre-wrap">
          {subjectKey ? subjects[subjectKey].main : ''}
        </p>
        <p className="font-M00 text-base text-center text-400 leading-135 font-normal mb-12">
          {subjectKey ? subjects[subjectKey].sub : ''}
        </p>
        <img src={ieum} alt="이음_프로필" />
      </div>
    </div>
  )
}

export default NoContents
