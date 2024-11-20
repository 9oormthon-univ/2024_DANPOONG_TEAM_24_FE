import React, { useState } from 'react'
import CategoryButton from './CategoryButton'
import { categoryArr } from '../../utils/category'

interface ScrollCategoryBarProps {
  onCategoryChange?: (category: string) => void
}

const ScrollCategoryBar: React.FC<ScrollCategoryBarProps> = ({
  onCategoryChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>('전체')

  const handleButtonClick = (category: string) => {
    setActiveCategory(category)
    localStorage.setItem('category', category)
    if (onCategoryChange) {
      onCategoryChange(category)
    }
  }

  const containerClasses = [
    'overflow-x-auto',
    'scrollbar-hidden',
    'mt-[10px]',
    'pb-[16px]',
  ].join(' ')

  const buttonContainerClasses = [
    'flex',
    'flex-row',
    'w-[358px]',
    'justify-start',
    'items-center',
    'gap-2',
    'whitespace-nowrap',
  ].join(' ')

  return (
    <div className={containerClasses}>
      <div className={buttonContainerClasses}>
        {Object.keys(categoryArr).map((category) => (
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

export default ScrollCategoryBar
