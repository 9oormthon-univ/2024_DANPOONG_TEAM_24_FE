import React, { useState } from 'react'
import CategoryButton from './CategoryButton'

const ScrollCategoryBar: React.FC<{ aboutWrite?: boolean }> = ({
  aboutWrite,
}) => {
  const categoryArr = [
    '전체',
    '인기글',
    '레시피 공유',
    '추천 가맹점',
    '지원 프로그램 공유',
    '일상',
  ]

  const writeCategoryArr = [
    '레시피 공유',
    '추천 가맹점',
    '지원 프로그램 공유',
    '일상',
  ]

  const [activeCategory, setActiveCategory] = useState<string | null>(
    aboutWrite ? null : '전체'
  )

  const handleButtonClick = (category: string) => {
    setActiveCategory(category)
    localStorage.setItem('category', category)
  }

  const containerClasses = [
    'w-full',
    'overflow-x-auto',
    'scrollbar-hidden',
    'px-[16px]',
    'pt-[10px]',
    '[&::-webkit-scrollbar]:hidden',
    aboutWrite ? 'pb-[10px]' : 'pb-[16px]',
  ].join(' ')

  const buttonContainerClasses = [
    'flex',
    'flex-row',
    'justify-start',
    'items-center',
    aboutWrite ? 'gap-[6px]' : 'gap-2',
    'whitespace-nowrap',
  ].join(' ')

  return (
    <div className={containerClasses}>
      <div className={buttonContainerClasses}>
        {(aboutWrite ? writeCategoryArr : categoryArr).map((category) => (
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
