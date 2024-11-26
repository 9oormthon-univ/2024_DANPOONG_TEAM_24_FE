import React from 'react'

interface ContentInputProps {
  content: string
  onContentChange: (content: string) => void
}

const ContentInput: React.FC<ContentInputProps> = ({
  content,
  onContentChange,
}) => {
  return (
    <textarea
      placeholder="본문은 최대 300자로 작성할 수 있어요"
      maxLength={300}
      value={content}
      onChange={(e) => {
        onContentChange(e.target.value)
      }}
      className="w-[357px] h-[232px] bg-100 rounded-[12px] py-5 px-[9px] text-sm placeholder-C400 text-800 leading-135 font-M00 outline-none resize-none"
    />
  )
}

export default ContentInput
