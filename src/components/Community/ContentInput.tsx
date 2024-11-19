import React, { useState } from 'react'

const ContentInput: React.FC = () => {
  const [textCount, setTextCount] = useState(0)

  const onTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(e.target.value.length)
  }

  return (
    <div className="flex flex-col gap-1">
      <textarea
        placeholder="본문은 최대 300자로 작성할 수 있어요"
        maxLength={300}
        onChange={onTextHandler}
        className="w-[357px] h-[232px] bg-100 rounded-[12px] border border-200 py-5 px-[9px] text-sm text-C400 leading-135 font-M00 outline-none resize-none"
      />
      <p className="text-end text-xs leading-140 font-L00 text-C400">
        {textCount}/300
      </p>
    </div>
  )
}

export default ContentInput
