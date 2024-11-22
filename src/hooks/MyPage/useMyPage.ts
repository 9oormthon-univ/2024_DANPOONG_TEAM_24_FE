import { useState } from 'react'
import defaultAxios from '../../api/defaultAxios'
import profileResponse from '../../types/MyPage/ProfileResponse'

const useMypage = () => {
  const [profileInfo, setProfileInfo] = useState<profileResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // 사용자 정보 조회
  const fetchGetProfile = async () => {
    try {
      setIsLoading(true)
      const response = await defaultAxios.get(`/user/info`)
      console.log(response.data)
      setProfileInfo(response.data)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { profileInfo, fetchGetProfile, isLoading, isError }
}

export default useMypage
