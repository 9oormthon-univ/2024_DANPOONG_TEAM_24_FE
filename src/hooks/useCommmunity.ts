import { useState } from 'react'
import { postRequest } from '../types/Community/PostRequest'
import defaultAxios from '../api/defaultAxios'
import { useNavigate } from 'react-router-dom'

const useCommunity = () => {
  const [postInfo, setPostInfo] = useState<postRequest>({
    title: '',
    content: '',
    categoryName: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  const updatePostInfo = (field: keyof postRequest, value: string) => {
    setPostInfo((prev) => {
      const newPostInfo = { ...prev, [field]: value }
      return newPostInfo
    })
  }

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

  return {
    postInfo,
    setPostInfo,
    updatePostInfo,
    isLoading,
    isError,
    fetchPostContents,
  }
}

export default useCommunity
