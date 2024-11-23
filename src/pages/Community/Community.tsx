import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollCategoryBar from '../../components/Community/ScrollCategoryBar'
import Contents from '../../components/Community/Contents'
import WriteButton from '../../components/Community/WriteButton'
import useCommunity from '../../hooks/Community/useCommmunity'
import { categoryArr } from '../../utils/category'
import LoadingSplash from '../Splash/LoadingSplash'
import NoContents from '../../components/Community/NoContents'

const Community: React.FC = () => {
  const { fetchGetCategoryContents, categoryCommentInfo, isLoading } =
    useCommunity()

  useEffect(() => {
    const currentCategory = localStorage.getItem('category') || '전체'
    fetchGetCategoryContents(categoryArr[currentCategory])
  }, [])

  const handleCategoryChange = (category: string) => {
    fetchGetCategoryContents(categoryArr[category])
  }

  if (isLoading) {
    return <LoadingSplash />
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <Header />
      <Footer />
      <div className="relative w-screen md:w-[390px] flex flex-col items-center">
        <div className="flex flex-col w-full border-t border-t-200 mt-[10px] items-center">
          <ScrollCategoryBar onCategoryChange={handleCategoryChange} />
          {/* 카테고리 변경 핸들러 전달 */}
          <div className="flex flex-col gap-[10px]">
            {categoryCommentInfo?.data.length === 0 ? (
              <NoContents subjectKey="my_post" />
            ) : (
              categoryCommentInfo?.data.map((content, index) => (
                <Contents
                  key={content.post_id}
                  nickname={content.author}
                  title={content.title}
                  content={content.content}
                  updateHour={content.created_at}
                  imgUrl={content.author_profile_url}
                  postId={content.post_id}
                  category={content.post_category}
                  likes={content.like_user.length}
                  comments={content.comment_count}
                  isLabel
                  isLastComment={index === categoryCommentInfo?.data.length - 1}
                />
              ))
            )}
          </div>
          <div className="fixed bottom-[108px] z-50 self-end">
            <WriteButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
