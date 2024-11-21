import { useState, useEffect } from 'react'
import axios from 'axios'

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      axios
        .get('https://api.ideabank.me/oauth', { params: { code } })
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
  }, [])

  return {
    isLoading,
    isError,
    errorMessage,
    accessToken,
  }
}

export default useAuth
