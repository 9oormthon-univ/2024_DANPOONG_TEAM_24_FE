import React from 'react'

interface ProfileProps {
  nickname: string
  updateHour: number
}
const Profile: React.FC<ProfileProps> = ({ nickname, updateHour }) => {
  return (
    <div className="flex flex-row gap-[10px]">
      <div className="w-[32px] h-[32px] bg-[#000] rounded-full" />
      <div className="flex flex-col justify-between">
        <p className="text-sm font-SB00 leading-[19.6px]">{nickname}</p>
        <p className="text-xs font-L00 fo leading-[16.8px] text-C400">
          {updateHour}시간 전
        </p>
      </div>
    </div>
  )
}

export default Profile
