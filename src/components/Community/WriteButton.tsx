import React from 'react'
import plus from '../../assets/community/plus.svg'
import { useNavigate } from 'react-router-dom'

const WriteButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate('write')}>
      <img src={plus} alt="plus" />
    </button>
  )
}

export default WriteButton
