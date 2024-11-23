import { useState } from 'react'
import defaultAxios from '../../api/defaultAxios'
import { CommentRequest } from '../../types/Community/CommentRequest'

const useComment = () => {
  const [commentInfo, setCommentInfo] = useState<CommentRequest>({
    postId: 0,
    content: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // 댓글 달기
  const fetchPostComment = async (currentCommentInfo: CommentRequest) => {
    try {
      setIsLoading(true)
      await defaultAxios.post('/comment', currentCommentInfo)
      setCommentInfo({ postId: 0, content: '' })
      setIsError(false)
    } catch (error) {
      setIsError(true)
      setErrorMessage('댓글 제출에 실패했습니다.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    commentInfo,
    setCommentInfo,
    fetchPostComment,
    isLoading,
    isError,
    errorMessage,
  }
}

export default useComment
