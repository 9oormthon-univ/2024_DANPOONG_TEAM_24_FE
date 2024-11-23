import React, { useEffect } from 'react'
import NaviBar from '../../components/Community/NaviBar'
import Notice from '../../components/Community/Notice'
import TitleInput from '../../components/Community/TitleInput'
import ContentInput from '../../components/Community/ContentInput'
import CompleteButton from '../../components/Community/CompleteButton'
import useCommunity from '../../hooks/Community/useCommmunity'
import CategoryBar from '../../components/Community/CategoryBar'
import LoadingSplash from '../Splash/LoadingSplash'
import { useLocation } from 'react-router-dom'

const Write: React.FC = () => {
  const { postInfo, updatePostInfo, isLoading } = useCommunity()
  const location = useLocation()

  const initialTitle = location.state?.title || postInfo.title
  const initialContent = location.state?.contents || postInfo.content

  const handleCategoryChange = (category: string) => {
    updatePostInfo('categoryName', category)
  }

  useEffect(() => {
    updatePostInfo('title', initialTitle)
    updatePostInfo('content', initialContent)
  }, [initialTitle, initialContent])

  if (isLoading) {
    return <LoadingSplash />
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <NaviBar subject="글쓰기" />
      <div className="flex flex-col w-screen md:w-[390px] border-t border-t-200 items-center gap-[30px]">
        <Notice />
        <div className="flex flex-col items-center">
          <CategoryBar
            onCategoryChange={handleCategoryChange}
            isShared={location.state}
          />
          <TitleInput
            title={postInfo.title} // postInfo에서 읽어오기
            onTitleChange={(title) => {
              updatePostInfo('title', title)
            }}
          />
        </div>
        <ContentInput
          content={postInfo.content} // postInfo에서 읽어오기
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
