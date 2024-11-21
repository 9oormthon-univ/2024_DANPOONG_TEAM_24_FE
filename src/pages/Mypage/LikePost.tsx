import React from 'react'
import Contents from '../../components/Community/Contents'
import MyPageHeader from '../../components/MyPage/MyPageHeader'

const LikePost: React.FC = () => {
  const likePost = [
    { nickname: '익명의 카피바라', updateHour: '', postId: 1 },
    { nickname: '익명의 고슴도치', updateHour: '', postId: 2 },
    { nickname: '익명의 다람쥐', updateHour: '', postId: 3 },
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[390px]">
        <MyPageHeader title="좋아요 누른 글" />
        <div className="p-4 flex flex-col gap-4 border-t border-200">
          {likePost.map((post) => (
            <Contents
              key={post.postId}
              nickname={post.nickname}
              title=""
              content="s"
              imgUrl=""
              category="recipe"
              updateHour=""
              postId={post.postId}
              isLabel
              isLastComment={false}
              likes={0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LikePost
