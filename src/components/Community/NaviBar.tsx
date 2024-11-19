import React from 'react'
import arrow from '../../assets/community/left_arrow.svg'
import { useNavigate } from 'react-router-dom'

interface NaviProps {
  subject: string
}

const NaviBar: React.FC<NaviProps> = ({ subject }) => {
  const navigate = useNavigate()
  return (
    <div className="relative flex items-center justify-center py-[11px]">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-[19px]"
      >
        <img src={arrow} />
      </button>
      <p className="text-lg font-SB00">{subject}</p>
    </div>
  )
}

export default NaviBar
