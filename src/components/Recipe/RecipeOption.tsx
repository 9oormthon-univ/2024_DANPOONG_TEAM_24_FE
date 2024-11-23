import gs25 from '../../assets/recipe/GS25.svg'
import cu from '../../assets/recipe/CU.svg'
import sevenEleven from '../../assets/recipe/SEVENELEVEN.svg'
import orange from '../../assets/recipe/orange.svg'
import energy from '../../assets/recipe/energy.svg'
import low from '../../assets/recipe/low.svg'
import lowSugar from '../../assets/recipe/low_sugar.svg'
import lettuce from '../../assets/recipe/lettuce.svg'
import balance from '../../assets/recipe/balance.svg'

interface RecipeOptionProps {
  isSelected?: boolean
  content: string
  onClick?: () => void
  isKeyword?: boolean
  isStore?: boolean
  isReturn?: boolean
}

interface RecipeIcons {
  [key: string]: string // 모든 키가 string 타입임을 명시
  '상큼한 비타민': string
  '에너지 넘치는 영양소': string
  '가벼운 저칼로리': string
  '건강한 저당': string
  '아삭한 식이섬유': string
  '균형 잡힌 식단': string
}

export default function RecipeOption({
  isSelected,
  isKeyword = false,
  content,
  onClick,
  isStore,
  isReturn,
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

  const svgs: RecipeIcons = {
    '상큼한 비타민': orange,
    '에너지 넘치는 영양소': energy,
    '가벼운 저칼로리': low,
    '건강한 저당': lowSugar,
    '아삭한 식이섬유': lettuce,
    '균형 잡힌 식단': balance,
  }

  const logo = getLogo()

  return (
    <div
      onClick={onClick}
      className={`flex items-center rounded-[20px] cursor-pointer px-[10px] py-2 ${
        isSelected
          ? 'bg-Main2 border border-Main'
          : !isReturn
          ? 'hover:bg-gray-50 border border-200'
          : ''
      }
      ${isReturn ? 'bg-white' : ''}
        `}
    >
      {isStore ? (
        <img src={logo} alt="store logo" />
      ) : (
        <div
          className={`flex items-center gap-1 font-M00 text-[#000000] text-nowrap ${
            isKeyword ? 'text-[12px]' : 'text-[14px]'
          } `}
        >
          <img src={svgs[content]} />
          {content}
        </div>
      )}
    </div>
  )
}
