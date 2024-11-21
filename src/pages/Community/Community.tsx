import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollCategoryBar from '../../components/Community/ScrollCategoryBar'
import Contents from '../../components/Community/Contents'
import WriteButton from '../../components/Community/WriteButton'

const contents = [
  { nickname: '익명의 카피바라', updateHour: 1, postId: 1 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 2 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 3 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 4 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 5 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 6 },
  { nickname: '익명의 고양이', updateHour: 2, postId: 7 },
]

const Community: React.FC = () => {
  localStorage.setItem(
    'accessToken',
    'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhhaWxjcnlwdGljQG5hdmVyLmNvbSIsImlhdCI6MTczMjE1ODM4NiwiZXhwIjoxNzM0NzUwMzg2fQ.n7hiWjh8QvKb-Ef4VQW6w3RFaowL4p5cDvtaYHkUXBc'
  )
  useEffect(() => {
    localStorage.setItem('category', '전체')
  }, [])

  return (
    <div className="flex flex-col items-center bg-white">
      <Header />
      <Footer />
      <div className="relative w-screen md:w-[390px] flex flex-col items-center">
        <div className="flex flex-col w-full border-t border-t-200 mt-[10px] items-center">
          <ScrollCategoryBar />
          <div className="flex flex-col gap-[10px]">
            {contents.map((content, index) => (
              <Contents
                key={content.postId}
                nickname={content.nickname}
                updateHour={content.updateHour}
                postId={content.postId}
                isLabel
                isLastComment={index === contents.length - 1}
              />
            ))}
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
