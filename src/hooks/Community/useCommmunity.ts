import { useState } from 'react'
import { postRequest } from '../../types/Community/PostRequest'
import defaultAxios from '../../api/defaultAxios'
import { useNavigate } from 'react-router-dom'
import {
  getCategoryContentResponse,
  getPostResponse,
} from '../../types/Community/PostResponse'

const useCommunity = () => {
  // 게시글 작성 request body
  const [postInfo, setPostInfo] = useState<postRequest>({
    title: '',
    content: '',
    categoryName: '',
  })
  // 게시글 내용 및 댓글 조회 response
  const [contentCommentInfo, setContentCommentInfo] =
    useState<getPostResponse | null>(null)
  // 카테고리로 게시글 조회 response
  const [categoryCommentInfo, setCategoryCommentInfo] =
    useState<getCategoryContentResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  const updatePostInfo = (field: keyof postRequest, value: string) => {
    setPostInfo((prev) => {
      const newPostInfo = { ...prev, [field]: value }
      return newPostInfo
    })
  }

  // 게시글 작성
  const fetchPostContents = async (currentPostInfo: postRequest) => {
    console.log('Submitting postInfo:', currentPostInfo) // 제출할 상태 확인
    try {
      setIsLoading(true)
      const response = await defaultAxios.post('/posts', currentPostInfo)
      console.log(response.data)
      navigate('/community')
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // 게시글 내용 및 댓글 조회
  const fetchGetContentsComments = async (post_id: number) => {
    try {
      setIsLoading(true)
      const response = await defaultAxios.get(`/posts/${post_id}`)
      console.log(response.data)
      setContentCommentInfo(response.data.data)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // 카테고리 별 게시글 조회
  const fetchGetCategoryContents = async (category_name: string) => {
    console.log(category_name)
    try {
      setIsLoading(true)
      const response = await defaultAxios.get(`/posts/find/${category_name}`)
      console.log(response.data)
      setCategoryCommentInfo(response.data)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    postInfo,
    setPostInfo,
    updatePostInfo,
    isLoading,
    isError,
    fetchPostContents,
    fetchGetContentsComments,
    fetchGetCategoryContents,
    contentCommentInfo,
    categoryCommentInfo,
  }
}

export default useCommunity
