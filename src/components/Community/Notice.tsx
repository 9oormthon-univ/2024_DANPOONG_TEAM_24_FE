import React from 'react'

const Notice: React.FC = () => {
  return (
    <div className="flex text-400 text-xs w-[358px] h-[56px] mt-[14px] justify-center items-center bg-100 rounded-[12px] border border-200">
      <div className="flex flex-row gap-[17px]">
        <p className="text-xs font-SB00">안내</p>
        <div className="whitespace-pre-wrap font-R00">
          카테고리를 선택해 글을 작성해보세요{'\n'}단. 명예훼손, 광고/홍보
          목적의글을 게시할 수 없어요
        </div>
      </div>
    </div>
  )
}

export default Notice
