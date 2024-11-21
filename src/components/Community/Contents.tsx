import React from 'react'
import CountComponent from './CountComponent'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import Label from './Label'

interface ContentProps {
  nickname: string
  updateHour: string
  title: string
  content: string
  postId: number
  isLabel: boolean
  isLastComment?: boolean
  imgUrl: string
  category: string
  likes: number
  comments: number
}

const Contents: React.FC<ContentProps> = ({
  nickname,
  updateHour,
  title,
  content,
  postId,
  isLabel,
  isLastComment,
  imgUrl,
  category,
  likes,
  comments,
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
      className={`relative flex w-[358px] h-[146px] items-center justify-center bg-100 rounded-[12px] border border-200 ${
        isLastComment ? 'mb-[103px]' : ''
      }`}
    >
      <div className="flex flex-col w-[338px] h-[122px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <Profile
              nickname={nickname}
              updateHour={updateHour}
              imgUrl={imgUrl}
            />
            {isLabel ? <Label category={category} /> : ''}
          </div>

          <div className="flex flex-col">
            <p className="text-800 font-SB00 text-sm line-clamp-1 text-ellipsis">
              {title}
            </p>
            <p className="text-[14px] line-clamp-1 text-ellipsis font-R00 font-normal leading-[18.9px] text-800">
              {content}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute left-[10px] bottom-3 flex flex-row justify-start items-center gap-[10px]">
        <CountComponent label="like" count={likes} />
        <CountComponent label="comment" count={comments} />
      </div>
    </div>
  )
}

export default Contents
