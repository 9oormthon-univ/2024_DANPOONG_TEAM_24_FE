import React, { useState, useEffect } from 'react'
import nonlike from '../../assets/community/like_full.svg'
import like from '../../assets/community/like_full_clicked.svg'
import useCommunity from '../../hooks/Community/useCommmunity'

const LikeButton: React.FC<{
  isLike: boolean
  postId: number
  onLikeToggle: () => void
}> = ({ isLike, postId, onLikeToggle }) => {
  const { fetchPostLike } = useCommunity()
  const [isClick, setIsClick] = useState<boolean>(isLike)

  useEffect(() => {
    setIsClick(isLike)
  }, [isLike])

  // 공감하기 버튼 클릭 시, clikck state 변경 + 좋아요 api 호출 + fetchGetContentsComments 호출
  const handleClick = async () => {
    const newLikeState = !isClick
    setIsClick(newLikeState)
    await fetchPostLike(postId)
    onLikeToggle()
  }

  return (
    <button
      onClick={handleClick}
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
