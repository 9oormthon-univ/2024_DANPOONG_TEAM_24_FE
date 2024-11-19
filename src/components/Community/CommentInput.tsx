import React from 'react'
import submit from '../../assets/community/submit.svg'

const CommentInput: React.FC = () => {
  return (
    <div className="fixed bottom-[55px] flex flex-row items-center justify-center w-[358px] h-[47px] text-400 text-sm bg-100 border border-200 rounded-[12px]">
      <div className="flex w-[327px] h-[19px] justify-between items-center">
        <input
          type="text"
          placeholder="댓글 작성하기"
          className="bg-transparent text-start leading-135 outline-none"
        />
        <button type="button">
          <img src={submit} alt="제출" />
        </button>
      </div>
    </div>
  )
}

export default CommentInput
