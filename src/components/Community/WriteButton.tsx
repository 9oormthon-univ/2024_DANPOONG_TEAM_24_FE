import React from 'react'
import add from '../../assets/community/add.svg'
import { useNavigate } from 'react-router-dom'

const WriteButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate('write')}
      className="flex flex-row justify-center items-center gap-[5px] w-[131px] h-[60px] rounded-[12px] bg-Main"
    >
      <img src={add} alt="plus" />
      <p className="text-lg font-SB00">글쓰기</p>
    </button>
  )
}

export default WriteButton
