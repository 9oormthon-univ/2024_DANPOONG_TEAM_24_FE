import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const redirectUrl = window.location.origin + location.pathname // 현재 주소
    alert(redirectUrl)

    if (code) {
      axios
        .get('https://api.ideabank.me/oauth', {
          params: {
            code,
            redirect_uri: redirectUrl, // 현재 주소를 redirect_url로 설정
          },
        })
        .then((response) => {
          const token = response.headers.authorization
          if (token) {
            localStorage.setItem('accessToken', token)
            setAccessToken(token)
            localStorage.setItem('isLoggedIn', 'true')
          }
        })
        .catch((error) => {
          setIsError(true)
          setErrorMessage('Error sending code: ' + error.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsError(true)
      setErrorMessage('Authorization code missing in URL')
      setIsLoading(false)
    }
  }, [location])

  return {
    isLoading,
    isError,
    errorMessage,
    accessToken,
  }
}

export default useAuth
