import React, { useState } from 'react'
import CategoryButton from './CategoryButton'
import { categoryArr, writeCategoryArr } from '../../utils/category'

const ScrollCategoryBar: React.FC<{ aboutWrite?: boolean }> = ({
  aboutWrite,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    aboutWrite ? null : '전체'
  )

  const handleButtonClick = (category: string) => {
    setActiveCategory(category)
    localStorage.setItem('category', category)
  }

  const containerClasses = [
    'overflow-x-auto',
    'scrollbar-hidden',
    'mt-[10px]',
    aboutWrite ? 'pb-[10px]' : 'pb-[16px]',
  ].join(' ')

  const buttonContainerClasses = [
    'flex',
    'flex-row',
    'w-[358px]',
    'justify-start',
    'items-center',
    aboutWrite ? 'gap-[6px]' : 'gap-2',
    'whitespace-nowrap',
  ].join(' ')

  const categories = aboutWrite ? writeCategoryArr : categoryArr

  return (
    <div className={containerClasses}>
      <div className={buttonContainerClasses}>
        {categories.map((category) => (
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
