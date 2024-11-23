import React, { useState, useEffect } from 'react'
import CategoryButton from './CategoryButton'
import { writeCategoryArr } from '../../utils/category'

interface CategoryBarProps {
  onCategoryChange?: (category: string) => void
  isShared?: boolean
}

const CategoryBar: React.FC<CategoryBarProps> = ({
  onCategoryChange,
  isShared,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    if (isShared) {
      setActiveCategory('레시피 공유')
      if (onCategoryChange) {
        onCategoryChange(writeCategoryArr['레시피 공유'])
      }
    }
  }, [isShared])

  const handleButtonClick = (category: string) => {
    setActiveCategory(category)
    if (onCategoryChange) {
      onCategoryChange(writeCategoryArr[category])
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
