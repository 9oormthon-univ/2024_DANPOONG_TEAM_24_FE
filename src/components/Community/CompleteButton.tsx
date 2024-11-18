import React from 'react'
import { useNavigate } from 'react-router-dom'

const CompleteButton: React.FC = () => {
  const navigate = useNavigate()

  const onClickMethod = () => {
    navigate('/community')
  }
  return (
    <button
      type="button"
      onClick={onClickMethod}
      className="fixed bottom-12 w-[358px] h-[60px] rounded-[12px] bg-Main text-center font-SB00 text-lg"
    >
      작성 완료하기
    </button>
  )
}

export default CompleteButton
