import React from 'react'

interface TitleInputProps {
  title: string
  onTitleChange: (title: string) => void
}

const TitleInput: React.FC<TitleInputProps> = ({ title, onTitleChange }) => {
  return (
    <input
      type="text"
      placeholder="제목"
      value={title}
      onChange={(e) => {
        onTitleChange(e.target.value)
      }}
      className="w-[358px] h-[47px] bg-100 rounded-[12px] font-M00 px-[10px] py-[11px] text-base leading-135 placeholder-400 text-800 outline-none"
    />
  )
}

export default TitleInput
