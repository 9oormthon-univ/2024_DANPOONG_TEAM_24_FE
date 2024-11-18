import React from 'react'
import CountComponent from './CountComponent'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

interface ContentProps {
  nickname: string
  updateHour: number
  postId: number
}

const Contents: React.FC<ContentProps> = ({ nickname, updateHour, postId }) => {
  const navigate = useNavigate()

  const onClickPost = () => {
    navigate(`${postId}`, {
      state: { nickname: { nickname }, updateHour: { updateHour } },
    })
  }

  return (
    <div
      onClick={onClickPost}
      className="flex w-[358px] h-[144px] items-center justify-center bg-100 rounded-[12px] border border-200"
    >
      <div className="flex flex-col w-[338px] h-[116px] gap-[10px]">
        <Profile nickname={nickname} updateHour={updateHour} />
        <p className="text-[14px] line-clamp-2 font-R00 font-normal leading-[18.9px] text-800">
          00님 편의점 레시피 시도했는데 맛있어요! 먹기 좋은 편의점 위치도
          공유합니다 00님 편의점 레시피 시도했는데 맛있어요! 먹기 좋은 편의점
          위치도 공유합니다
        </p>
        <div className="flex flex-row justify-end items-center gap-[10px]">
          <CountComponent label="view" count={17} />
          <CountComponent label="like" count={17} />
          <CountComponent label="comment" count={17} />
        </div>
      </div>
    </div>
  )
}

export default Contents
