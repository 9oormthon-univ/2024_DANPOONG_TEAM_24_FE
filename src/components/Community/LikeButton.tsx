import React from 'react'
import like from '../../assets/community/like_full.svg'

const LikeButton: React.FC = () => {
  return (
    <button className="flex p-1 gap-2 items-center border-[0.8px] border-400 rounded-[4px] bg-100">
      <img src={like} alt="좋아요" />
      <p className="text-center font-SB00 text-400 text-sm">공감하기</p>
    </button>
  )
}

export default LikeButton
