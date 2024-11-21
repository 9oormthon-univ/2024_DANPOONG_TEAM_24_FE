import React, { useState } from 'react'
import nonlike from '../../assets/community/like_full.svg'
import like from '../../assets/community/like_full_clicked.svg'

const LikeButton: React.FC = () => {
  const [isClick, setIsClick] = useState<boolean>(false)
  return (
    <button
      onClick={() => setIsClick((prev) => !prev)}
      className={`flex p-1 gap-2 items-center ${
        isClick ? 'border-[#FF8800] bg-Main2' : 'border-400 bg-100'
      } border-[0.8px] border-400 rounded-[4px]`}
    >
      <img src={isClick ? like : nonlike} alt="좋아요" />
      <p
        className={`text-center font-SB00 ${
          isClick ? 'text-[#FF8800]' : 'text-400'
        } text-sm`}
      >
        공감하기
      </p>
    </button>
  )
}

export default LikeButton
