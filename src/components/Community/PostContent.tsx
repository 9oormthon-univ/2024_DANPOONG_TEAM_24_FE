import React from 'react'
import Profile from './Profile'
import CountComponent from './CountComponent'
import LikeButton from './LikeButton'
import { getPostResponse } from '../../types/Community/PostResponse'

interface PostContentProps {
  contentCommentInfo: getPostResponse | null
  onLikeToggle: () => void
}

const PostContent: React.FC<PostContentProps> = ({
  contentCommentInfo,
  onLikeToggle,
}) => {
  if (!contentCommentInfo) {
    return <div>게시글을 불러오는 중입니다...</div>
  }

  return (
    <div className="w-[390px] flex flex-col justify-start px-4 pt-[39px]">
      <div className="flex flex-col gap-[18px]">
        <Profile
          nickname={contentCommentInfo.author}
          updateHour={contentCommentInfo.created_at}
          imgUrl={contentCommentInfo.author_profile_url}
        />
        <div className="text-800 text-base font-SB00 font-normal">
          {contentCommentInfo.title}
        </div>
      </div>
      <div className="w-[358px] mt-[18px] text-start text-sm font-L00 text-800 leading-135 whitespace-pre-wrap">
        {contentCommentInfo.content}
      </div>
      <div className="flex h-[28px] justify-between items-center mt-[10px] mb-[21px]">
        <LikeButton
          isLike={contentCommentInfo.liked_by_me}
          postId={contentCommentInfo.post_id}
          onLikeToggle={onLikeToggle}
        />
        <div className="flex flex-row items-center gap-[10px]">
          <CountComponent
            label="like"
            count={contentCommentInfo.like_user.length}
          />
          <CountComponent
            label="comment"
            count={contentCommentInfo.comments.length}
          />
        </div>
      </div>
    </div>
  )
}

export default PostContent
