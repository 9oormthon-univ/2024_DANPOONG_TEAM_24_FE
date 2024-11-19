import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollCategoryBar from '../../components/Community/ScrollCategoryBar'
import Contents from '../../components/Community/Contents'
import WriteButton from '../../components/Community/WriteButton'

const Community: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('category', '전체')
  }, [])

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Footer />
      <div className="flex flex-col border-t border-t-200 mt-[10px] items-center">
        <ScrollCategoryBar />
        {/* map 함수를 사용하여 나타낼 예정입니다! */}
        <div className="flex flex-col gap-[10px]">
          <Contents
            nickname="익명의 카피바라"
            updateHour={1}
            postId={1}
            isLabel
          />
        </div>
        <div className="fixed right-[16px] bottom-[108px] z-50">
          <WriteButton />
        </div>
      </div>
    </div>
  )
}

export default Community
