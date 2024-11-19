import React from 'react'
// import { useParams } from 'react-router-dom'
import NaviBar from '../../components/Community/NaviBar'
import PostContent from '../../components/Community/PostContent'
import PostComment from '../../components/Community/PostComment'
import CommentInput from '../../components/Community/CommentInput'

const Post: React.FC = () => {
  // const { postId } = useParams()
  const category = localStorage.getItem('category') || ''

  const comments = [
    {
      nickname: '익명의 카피바라',
      updateHour: 1,
      content: '우와 정말 감사해요',
    },
    { nickname: '익명의 카피바라', updateHour: 2, content: '짱짱' },
  ]

  return (
    <div className="flex flex-col items-center bg-white">
      <NaviBar subject={category} />
      <div className="flex flex-col border-t border-t-200 items-center">
        <PostContent />
        <div className="w-full h-2 bg-[#D9D9D9] mb-[30px]" />
        {/* 댓글 나열 */}
        <div className="flex flex-col gap-[10px]">
          {comments.map((comment, index) => (
            <PostComment
              key={index}
              nickname={comment.nickname}
              updateHour={comment.updateHour}
              comment={comment.content}
              isLastComment={index === comments.length - 1} // 마지막 댓글인지 확인
            />
          ))}
          <div className="w-[358px] h-[94px]" />
        </div>
        <CommentInput />
      </div>
    </div>
  )
}

export default Post
