import React from 'react';
import Contents from '../../components/Community/Contents';
import MyPageHeader from '../../components/MyPage/MyPageHeader'

const CommentPost: React.FC = () => {
    const commentPost = [
        { nickname: '익명의 카피바라', updateHour: 2, postId: 1 },
        { nickname: '익명의 고슴도치', updateHour: 5, postId: 2 },
        { nickname: '익명의 다람쥐', updateHour: 10, postId: 3 },
    ];

    return (
        <div>
            <MyPageHeader title="댓글 단 글" />
            <div className="p-4 flex flex-col gap-4 border-t border-200">
                {commentPost.map((post) => (
                    <Contents
                        key={post.postId}
                        nickname={post.nickname}
                        updateHour={post.updateHour}
                        postId={post.postId}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentPost;
