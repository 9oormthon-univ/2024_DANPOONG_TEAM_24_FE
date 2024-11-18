import React from 'react'
import NaviBar from '../../components/Community/NaviBar'
import Notice from '../../components/Community/Notice'
import ScrollCategoryBar from '../../components/Community/ScrollCategoryBar'
import TitleInput from '../../components/Community/TitleInput'
import ContentInput from '../../components/Community/ContentInput'
import CompleteButton from '../../components/Community/CompleteButton'

const Write: React.FC = () => {
  return (
    <div>
      <NaviBar subject="글쓰기" />
      <div className="flex flex-col border-t border-t-200 items-center gap-[30px]">
        <Notice />
        <div className="flex flex-col items-center">
          <ScrollCategoryBar aboutWrite />
          <TitleInput />
        </div>
        <ContentInput />
        <CompleteButton />
      </div>
    </div>
  )
}

export default Write
