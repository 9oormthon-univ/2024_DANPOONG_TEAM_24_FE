import React from 'react'
import Profile from './Profile'
import CountComponent from './CountComponent'
import LikeButton from './LikeButton'

const PostContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-start px-4 pt-[39px]">
      <Profile nickname="익명의 카피바라" updateHour={1} />
      <div className="w-[358px] mt-[30px] text-start text-sm font-L00 text-800 leading-135 whitespace-pre-wrap">
        00님 편의점 레시피 시도했는데 맛있어요! 먹기 좋은 편의점 위치도
        공유합니다 <br />
        <br />
        GS25 공릉역점 <br />
        서울 노원구 동일로192길 15 https://naver.me/5z5xRoOC
      </div>
      <div className="flex h-[28px] justify-between items-center mt-[10px] mb-[21px]">
        <LikeButton />
        <div className="flex flex-row items-center gap-[10px]">
          <CountComponent label="view" count={17} />
          <CountComponent label="like" count={17} />
          <CountComponent label="comment" count={17} />
        </div>
      </div>
    </div>
  )
}

export default PostContent
