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
      className="w-[358px] h-[47px] bg-100 rounded-[12px] border border-200 px-[10px] py-[11px] text-base leading-6 font-M00 text-400 outline-none"
    />
  )
}

export default TitleInput
