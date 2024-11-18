import React from 'react'

interface CategoryButtonProps {
  category: string
  isActive?: boolean
  onClick: () => void
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isActive,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.10)' }}
      className={`rounded-[20px] px-[10px] py-2 text-center text-sm font-M00 leading-135 border 
        ${isActive ? 'bg-[#FFF59D] border-Main' : 'bg-[#fff] border-200 '}`}
    >
      {category}
    </button>
  )
}

export default CategoryButton
