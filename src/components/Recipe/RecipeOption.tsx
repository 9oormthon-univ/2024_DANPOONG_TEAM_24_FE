import gs25 from '../../assets/recipe/GS25.svg'
import cu from '../../assets/recipe/CU.svg'
import sevenEleven from '../../assets/recipe/SEVENELEVEN.svg'

interface RecipeOptionProps {
  isSelected?: boolean
  isKeyword?: boolean
  content: string
  onClick?: () => void
  isStore?: boolean
}

export default function RecipeOption({
  isSelected,
  isKeyword = false,
  content,
  onClick,
  isStore,
}: RecipeOptionProps) {
  const getLogo = () => {
    switch (content) {
      case 'GS25':
        return gs25
      case 'CU':
        return cu
      case '세븐일레븐':
        return sevenEleven

      default:
        return gs25
    }
  }

  const logo = getLogo()

  return (
    <div
      onClick={onClick}
      className={`flex items-center rounded-[20px] cursor-pointer ${
        isKeyword ? 'px-[10px] py-[6px]' : 'px-4 py-2'
      } ${
        isSelected
          ? 'bg-Main2 border border-Main'
          : 'hover:bg-gray-50 border border-200'
      }
        `}
    >
      {isStore ? (
        <img src={logo} alt="store logo" />
      ) : (
        <div
          className={`font-M00 text-[#000000] text-nowrap ${
            isKeyword ? 'text-[12px]' : 'text-[14px]'
          } `}
        >
          {content}
        </div>
      )}
    </div>
  )
}
