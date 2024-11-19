import React from 'react'

const TitleInput: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="제목"
      className="w-[358px] h-[47px] bg-100 rounded-[12px] border border-200 px-[10px] py-[11px] text-base leading-6 font-M00 text-400 outline-none"
    ></input>
  )
}

export default TitleInput