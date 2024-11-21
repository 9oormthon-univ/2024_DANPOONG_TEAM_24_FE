import React from 'react'
import useCommunity from '../../hooks/useCommmunity'
import { postRequest } from '../../types/Community/PostRequest'

interface CompleteButtonProps {
  postInfo: postRequest
}

const CompleteButton: React.FC<CompleteButtonProps> = ({ postInfo }) => {
  const { fetchPostContents } = useCommunity()

  const onClickMethod = async () => {
    if (postInfo.title && postInfo.content && postInfo.categoryName) {
      await fetchPostContents(postInfo)
    } else {
      alert('모든 내용을 작성해주세요!')
    }
  }

  return (
    <button
      type="button"
      onClick={onClickMethod}
      className={`fixed bottom-12 w-[358px] h-[60px] rounded-[12px] bg-Main text-center font-SB00 text-lg ${
        postInfo.title && postInfo.content && postInfo.categoryName
          ? 'opacity-100'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      작성 완료하기
    </button>
  )
}

export default CompleteButton
