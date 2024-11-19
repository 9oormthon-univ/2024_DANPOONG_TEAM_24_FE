interface RecipeOptionProps {
  isSelected?: boolean
  isKeyword?: boolean
  content: string
  onClick?: () => void
}

export default function RecipeOption({
  isSelected,
  isKeyword = false,
  content,
  onClick,
}: RecipeOptionProps) {
  return (
    <div
      onClick={onClick}
      className={`items-center rounded-[20px] cursor-pointer ${
        isKeyword ? 'px-[10px] py-[6px]' : 'px-4 py-2'
      } ${
        isSelected
          ? 'bg-Main2 border border-Main'
          : 'hover:bg-gray-50 border border-200'
      }
        `}
    >
      <div
        className={`font-M00 text-[#000000] text-nowrap ${
          isKeyword ? 'text-[12px]' : 'text-[14px]'
        } `}
      >
        {content}
      </div>
    </div>
  )
}
