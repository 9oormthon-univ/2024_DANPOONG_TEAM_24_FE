import React from 'react'
import NaviBar from '../../components/Community/NaviBar'
import Notice from '../../components/Community/Notice'
import TitleInput from '../../components/Community/TitleInput'
import ContentInput from '../../components/Community/ContentInput'
import CompleteButton from '../../components/Community/CompleteButton'
import useCommunity from '../../hooks/Community/useCommmunity'
import CategoryBar from '../../components/Community/CategoryBar'
import LoadingSplash from '../Splash/LoadingSplash'

const Write: React.FC = () => {
  const { postInfo, updatePostInfo, isLoading } = useCommunity()

  const handleCategoryChange = (category: string) => {
    updatePostInfo('categoryName', category)
  }

  if (isLoading) {
    return <LoadingSplash />
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <NaviBar subject="글쓰기" />
      <div className="flex flex-col w-screen md:w-[390px] border-t border-t-200 items-center gap-[30px]">
        <Notice />
        <div className="flex flex-col items-center">
          <CategoryBar onCategoryChange={handleCategoryChange} />
          <TitleInput
            title={postInfo.title}
            onTitleChange={(title) => {
              updatePostInfo('title', title)
            }}
          />
        </div>
        <ContentInput
          content={postInfo.content}
          onContentChange={(content) => {
            updatePostInfo('content', content)
          }}
        />
        <CompleteButton postInfo={postInfo} />
      </div>
    </div>
  )
}

export default Write
