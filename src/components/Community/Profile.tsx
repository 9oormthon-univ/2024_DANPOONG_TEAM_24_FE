import React from 'react'
import nonProfile from '../../assets/nonProfile.svg'

interface ProfileProps {
  nickname: string | null | undefined
  updateHour: string | null | undefined
  imgUrl: string | undefined
}
const Profile: React.FC<ProfileProps> = ({ nickname, updateHour, imgUrl }) => {
  return (
    <div className="flex flex-row gap-[10px]">
      <img
        src={imgUrl && imgUrl !== '' ? imgUrl : nonProfile}
        alt="프로필이미지"
        className="w-[32px] h-[32px] rounded-full"
      />
      <div className="flex flex-col justify-between">
        <p className="text-sm font-SB00 leading-[19.6px]">{nickname}</p>
        <p className="text-xs font-L00 fo leading-[16.8px] text-C400">
          {updateHour}
        </p>
      </div>
    </div>
  )
}

export default Profile
