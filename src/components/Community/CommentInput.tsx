import React from 'react'
import submit from '../../assets/community/submit.svg'
import useComment from '../../hooks/Community/useComment'

interface CommentInputProps {
  postId: number
  fetchGetContentsComments: (postId: number) => void // 타입 정의
}

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  fetchGetContentsComments,
}) => {
  const { commentInfo, setCommentInfo, fetchPostComment } = useComment()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInfo((prev) => ({
      ...prev,
      content: e.target.value,
      postId: postId,
    }))
  }

  const handleSubmit = async () => {
    if (commentInfo.content.trim()) {
      await fetchPostComment(commentInfo)
      setCommentInfo({ postId: 0, content: '' })
      fetchGetContentsComments(postId) // 댓글 추가 후 리렌더링
    }
  }

  return (
    <div className="fixed bottom-[55px] flex flex-row items-center justify-center w-[358px] h-[47px] text-400 text-sm bg-100 border border-200 rounded-[12px]">
      <div className="flex w-[327px] h-[19px] justify-between items-center">
        <input
          type="text"
          placeholder="댓글 작성하기"
          onChange={handleInputChange}
          className="bg-transparent text-start leading-135 outline-none"
        />
        <button type="button" onClick={handleSubmit}>
          <img src={submit} alt="제출" />
        </button>
      </div>
    </div>
  )
}

export default CommentInput
