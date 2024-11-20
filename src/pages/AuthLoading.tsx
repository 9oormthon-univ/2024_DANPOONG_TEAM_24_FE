import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AuthLoading() {
  const navigate = useNavigate()

  useEffect(() => {
    // 현재 url에서 인가코드 추출
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    console.log(code)

    // 인가코드 서버로 전송
    if (code) {
      axios
        .post('https://api.ideabank.me/oauth', { code })
        .then((response) => {
          console.log('Response from server:', response.data)
          // 전송 완료시 메인 페이지로 이동
          navigate('/')
        })
        .catch((error) => {
          console.error('Error sending code:', error)
        })
    }
  }, [navigate])

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>로그인 성공</h1>
        <h2>Loading...</h2>
      </div>
    </>
  )
}
