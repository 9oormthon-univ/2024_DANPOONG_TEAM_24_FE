import React from 'react'
import label from '../../utils/label'

interface LabelProps {
  category: string
}

const Label: React.FC<LabelProps> = ({ category }) => {
  return (
    <div
      className={`absolute border-[0.51px] rounded-[4px] top-[19px] right-[13px] p-1 text-center font-SB00 text-[10px] ${label[category].style}`}
    >
      <p>{label[category].label}</p>
    </div>
  )
}

export default Label
