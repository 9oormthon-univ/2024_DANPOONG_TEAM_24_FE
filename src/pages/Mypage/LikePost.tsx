import React, { useEffect } from 'react'
import Contents from '../../components/Community/Contents'
import MyPageHeader from '../../components/MyPage/MyPageHeader'
import { useLocation } from 'react-router-dom'
import useMypage from '../../hooks/MyPage/useMyPage'
import NoContents from '../../components/Community/NoContents'

const LikePost: React.FC = () => {
  const { postInfo, fetchGetSpecPosts } = useMypage()
  const location = useLocation()

  useEffect(() => {
    fetchGetSpecPosts(location.state.category)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[390px]">
        <MyPageHeader title="좋아요 누른 글" />
        <div className="p-4 flex flex-col gap-4 border-t border-200">
          {postInfo?.data.length === 0 ? (
            <NoContents />
          ) : (
            postInfo?.data.map((post) => (
              <Contents
                key={post.post_id}
                nickname={post.author}
                title={post.title}
                content={post.content}
                imgUrl={post.author_profile_url}
                category={post.post_category}
                updateHour={post.created_at}
                postId={post.post_id}
                isLabel
                isLastComment={false}
                likes={post.likes}
                comments={post.comment_count}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default LikePost
