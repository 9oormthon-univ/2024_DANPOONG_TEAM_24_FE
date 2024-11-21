import React from 'react'
import commentIcon from '../../assets/community/comment.svg'
import likeIcon from '../../assets/community/like.svg'

const CountComponent: React.FC<{ label: string; count: number }> = ({
  label,
  count,
}) => {
  let iconSrc
  switch (label) {
    case 'like':
      iconSrc = likeIcon
      break
    case 'comment':
      iconSrc = commentIcon
      break
    default:
      iconSrc = ''
  }

  return (
    <div className="flex flex-row items-center gap-[6px]">
      <img src={iconSrc} alt={label} />
      <p className="text-400 text-[10px] font-M00">{count}</p>
    </div>
  )
}

export default CountComponent
