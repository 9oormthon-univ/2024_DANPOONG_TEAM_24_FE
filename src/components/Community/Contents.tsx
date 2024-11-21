import React from 'react'
import CountComponent from './CountComponent'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import Label from './Label'

interface ContentProps {
  nickname: string
  updateHour: string
  content: string
  postId: number
  isLabel: boolean
  isLastComment: boolean
  imgUrl: string
  category: string
}

const Contents: React.FC<ContentProps> = ({
  nickname,
  updateHour,
  content,
  postId,
  isLabel,
  isLastComment,
  imgUrl,
  category,
}) => {
  const navigate = useNavigate()

  const onClickPost = () => {
    navigate(`${postId}`, {
      state: { category },
    })
  }

  return (
    <div
      onClick={onClickPost}
      className={`relative flex w-[358px] h-[144px] items-center justify-center bg-100 rounded-[12px] border border-200 ${
        isLastComment ? 'mb-[103px]' : ''
      }`}
    >
      <div className="flex flex-col w-[338px] h-[116px] gap-[10px]">
        <Profile nickname={nickname} updateHour={updateHour} imgUrl={imgUrl} />
        <p className="text-[14px] line-clamp-2 font-R00 font-normal leading-[18.9px] text-800">
          {content}
        </p>
        <div className="flex flex-row justify-end items-center gap-[10px]">
          <CountComponent label="view" count={17} />
          <CountComponent label="like" count={17} />
          <CountComponent label="comment" count={17} />
        </div>
      </div>
      {isLabel ? <Label category={category} /> : ''}
    </div>
  )
}

export default Contents
