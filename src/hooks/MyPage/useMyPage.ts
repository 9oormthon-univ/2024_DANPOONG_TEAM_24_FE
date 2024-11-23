import { useState } from 'react'
import defaultAxios from '../../api/defaultAxios'
import { getCategoryContentResponse } from '../../types/Community/PostResponse'
import profile from '../../types/MyPage/ProfileResponse'

const useMypage = () => {
  // 사용자 정보 response
  const [profileInfo, setProfileInfo] = useState<profile | null>(null)
  // 특정 게시글 조회 response
  const [postInfo, setPostInfo] = useState<getCategoryContentResponse | null>(
    null
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // 사용자 정보 조회
  const fetchGetProfile = async () => {
    try {
      setIsLoading(true)
      const response = await defaultAxios.get(`/user/info`)
      setProfileInfo(response.data.data)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // 특정 게시글 조회 (내가 작성한 글, 댓글단 글, 좋아요 누른 글)
  const fetchGetSpecPosts = async (category: string) => {
    try {
      setIsLoading(true)
      const response = await defaultAxios.get(`/posts/get/${category}`)
      setPostInfo(response.data)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profileInfo,
    fetchGetProfile,
    isLoading,
    isError,
    fetchGetSpecPosts,
    postInfo,
  }
}

export default useMypage
