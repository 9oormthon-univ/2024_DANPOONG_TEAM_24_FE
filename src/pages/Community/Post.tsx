import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import NaviBar from '../../components/Community/NaviBar'
import PostContent from '../../components/Community/PostContent'
import PostComment from '../../components/Community/PostComment'
import CommentInput from '../../components/Community/CommentInput'
import useCommunity from '../../hooks/Community/useCommmunity'
import { categoryArr } from '../../utils/category'
import findKeyByValue from '../../utils/findKeyByValue'
import LoadingSplash from '../Splash/LoadingSplash'

const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string | undefined }>()
  const location = useLocation()
  const { contentCommentInfo, fetchGetContentsComments, isLoading } =
    useCommunity()

  const categoryValue = location.state?.category || 'all'
  const category = findKeyByValue(categoryArr, categoryValue) || '전체'

  useEffect(() => {
    if (postId) {
      fetchGetContentsComments(parseInt(postId, 10))
    }
  }, [postId])

  if (isLoading) {
    return <LoadingSplash />
  }

  const handleLikeToggle = () => {
    if (postId) {
      fetchGetContentsComments(parseInt(postId, 10))
    }
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <NaviBar subject={category} />
      <div className="flex flex-col border-t border-t-200 items-center">
        <PostContent
          contentCommentInfo={contentCommentInfo}
          onLikeToggle={handleLikeToggle} // onLikeToggle 전달
        />
        <div className="w-full h-2 bg-100 mb-[30px]" />
        <div className="flex flex-col gap-[10px]">
          {contentCommentInfo?.comments.map((comment, index) => (
            <PostComment
              key={index}
              nickname={comment.author}
              updateHour={comment.created_at}
              comment={comment.content}
              imgUrl={comment.author_profile_url || ''}
              isLastComment={index === contentCommentInfo.comments.length - 1}
            />
          ))}
          <div className="w-[358px] h-[94px]" />
        </div>
        <CommentInput
          postId={contentCommentInfo?.post_id ?? 0}
          fetchGetContentsComments={fetchGetContentsComments}
        />
      </div>
    </div>
  )
}

export default Post
