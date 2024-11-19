import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollCategoryBar from '../../components/Community/ScrollCategoryBar'
import Contents from '../../components/Community/Contents'
import WriteButton from '../../components/Community/WriteButton'

const comments = [
  { nickname: '익명의 카피바라', updateHour: 1, postId: 1 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 2 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 3 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 4 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 5 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 6 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 7 },
]

const Community: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('category', '전체')
  }, [])

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Footer />
      <div className="relative w-[390px] flex flex-col items-center">
        <div className="flex flex-col w-full border-t border-t-200 mt-[10px] items-center">
          <ScrollCategoryBar />
          <div className="flex flex-col gap-[10px]">
            {comments.map((comment, index) => (
              <Contents
                key={comment.postId}
                nickname={comment.nickname}
                updateHour={comment.updateHour}
                postId={comment.postId}
                isLabel
                isLastComment={index === comments.length - 1}
              />
            ))}
          </div>
          <div className="fixed right-4 bottom-[108px] 2xl:right-[664px] z-50">
            <WriteButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
