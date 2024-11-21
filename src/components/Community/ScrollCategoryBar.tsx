import React, { useEffect, useState } from 'react'
import CategoryButton from './CategoryButton'
import { categoryArr } from '../../utils/category'

interface ScrollCategoryBarProps {
  onCategoryChange?: (category: string) => void
}

const ScrollCategoryBar: React.FC<ScrollCategoryBarProps> = ({
  onCategoryChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    localStorage.getItem('category') || '전체'
  )

  useEffect(() => {
    localStorage.setItem('category', '전체')
  }, [])

  const handleButtonClick = (category: string) => {
    setActiveCategory(category) // 상태 업데이트
    localStorage.setItem('category', category) // 로컬 스토리지 업데이트
    if (onCategoryChange) {
      onCategoryChange(category) // 카테고리 변경 시 함수 호출
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
            isActive={activeCategory === category} // 활성화 상태 전달
            onClick={() => handleButtonClick(category)}
          />
        ))}
      </div>
    </div>
  )
}

export default ScrollCategoryBar
