import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import NaviBar from '../../components/Community/NaviBar'
import PostContent from '../../components/Community/PostContent'
import PostComment from '../../components/Community/PostComment'
import CommentInput from '../../components/Community/CommentInput'
import useCommunity from '../../hooks/Community/useCommmunity'
import { categoryArr } from '../../utils/category'
import findKeyByValue from '../../utils/findKeyByValue'

const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string }>()
  const location = useLocation()
  const { contentCommentInfo, fetchGetContentsComments, isLoading } =
    useCommunity()

  const categoryValue = location.state?.category || 'all' // 기본값 설정
  // 한글 카테고리 이름 찾기
  const category = findKeyByValue(categoryArr, categoryValue) || '전체' // 기본값 설정

  useEffect(() => {
    if (postId) {
      fetchGetContentsComments(parseInt(postId, 10))
    }
  }, [postId])

  // 로딩 스플래시 화면 넣을 예정
  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <NaviBar subject={category} />
      <div className="flex flex-col border-t border-t-200 items-center">
        <PostContent contentCommentInfo={contentCommentInfo} />
        <div className="w-full h-2 bg-[#D9D9D9] mb-[30px]" />
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
        <CommentInput postId={postId ? parseInt(postId, 10) : 0} />
      </div>
    </div>
  )
}

export default Post
