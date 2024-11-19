import React from 'react'
import Profile from './Profile'

interface CommentProps {
  nickname: string
  updateHour: number
  comment: string
  isLastComment?: boolean
}
const PostComment: React.FC<CommentProps> = ({
  nickname,
  updateHour,
  comment,
  isLastComment,
}) => {
  return (
    <div
      className={`flex flex-col w-[358px] gap-[10px] justify-start pb-[10px] ${
        isLastComment ? '' : 'border-b border-b-200'
      }`}
    >
      <Profile nickname={nickname} updateHour={updateHour} />
      <div className="font-normal text-sm text-start text-800 font-R00 leading-135 whitespace-pre-wrap">
        {comment}
      </div>
    </div>
  )
}

export default PostComment
