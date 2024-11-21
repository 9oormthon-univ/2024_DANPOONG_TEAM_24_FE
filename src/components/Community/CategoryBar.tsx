import React, { useState } from 'react'
import CategoryButton from './CategoryButton'
import { writeCategoryArr } from '../../utils/category'

interface CategoryBarProps {
  onCategoryChange?: (category: string) => void
}

const CategoryBar: React.FC<CategoryBarProps> = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleButtonClick = (category: string) => {
    setActiveCategory(category)
    if (onCategoryChange) {
      onCategoryChange(writeCategoryArr[category]) // 선택한 카테고리의 value를 전달
    }
  }

  const containerClasses = [
    'overflow-x-auto',
    'scrollbar-hidden',
    'mt-[10px]',
    'pb-[10px]',
  ].join(' ')

  const buttonContainerClasses = [
    'flex',
    'flex-row',
    'w-[358px]',
    'justify-start',
    'items-center',
    'gap-[6px]',
    'whitespace-nowrap',
  ].join(' ')

  return (
    <div className={containerClasses}>
      <div className={buttonContainerClasses}>
        {Object.keys(writeCategoryArr).map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isActive={activeCategory === category}
            onClick={() => handleButtonClick(category)}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryBar
