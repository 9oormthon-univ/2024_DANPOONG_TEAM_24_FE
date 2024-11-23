import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import arrow from '../../assets/common/Arrow.svg'
import restart from '../../assets/recipe/Restart.svg'
import { useGenerateRecipe } from '../../hooks/Recipe/UseGenerateRecipe'
import LoadingSplash from '../Splash/LoadingSplash'
import parseRecipeParagraphs from '../../utils/SplitRecipeResponse'
import requireCheck from '../../assets/recipe/RequireCheck.svg'
import downArrow from '../../assets/recipe/DownArrow.svg'
import chef from '../../assets/recipe/Chef.svg'
import RecipeItem from '../../components/Recipe/RecipeItem'
import price from '../../assets/recipe/Price.svg'
import { parseRecipeItems } from '../../utils/SplitRecipeResponse'
import RecipeOption from '../../components/Recipe/RecipeOption'

export default function RecipeReturn() {
  const navigate = useNavigate()
  const location = useLocation()

  const { recipeResponse, loading, generateRecipe } = useGenerateRecipe()

  // location.state에서 recipeOptions 가져오기
  const recipeOptions = location.state?.recipeOptions || []
  const text = location.state?.text || null

  const [sentences, setSentences] = useState<{
    recommendedItems: string[]
    total: string | null
    recommendation: string | null
  } | null>(null)

  interface RecipeItemProps {
    name: string
    price: string
    description: string
  }

  const [items, setItems] = useState<RecipeItemProps[]>([])

  const [isToggled, setIsToggled] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRIES = 3

  const requestNewRecipe = () => {
    if (recipeOptions.length > 0) {
      generateRecipe(recipeOptions, text)
    } else {
      console.error('Recipe options not provided')
    }
  }

  // 컴포넌트 마운트 시 레시피 요청 및 높이 조절
  useEffect(() => {
    if (recipeOptions.length > 0) {
      generateRecipe(recipeOptions, text)
    } else {
      console.error('Recipe options not provided')
    }
  }, [])

  // recipeResponse 업데이트 시 높이 조절 및 콘솔 출력
  useEffect(() => {
    if (recipeResponse) {
      console.log('레시피 : ', recipeResponse)

      // 파싱 작업
      const parsedSentences = parseRecipeParagraphs(
        recipeResponse.data.recipeParagraphs
      )
      setSentences(parsedSentences)

      const recipeItems = parseRecipeItems(parsedSentences.recommendedItems)
      console.log('test:', parsedSentences.recommendedItems)
      setItems(recipeItems)
      const hasInvalidItems = recipeItems.some(
        (item) =>
          item.name === '알 수 없는 아이템' ||
          item.price === '가격 정보 없음' ||
          item.description === '설명 없음'
      )

      if (
        hasInvalidItems &&
        retryCount < MAX_RETRIES &&
        parsedSentences.recommendedItems.length === 0
      ) {
        console.log(
          `레시피 다시 받아오는 중... (${retryCount + 1}/${MAX_RETRIES})`
        )
        setRetryCount((prev) => prev + 1)
        requestNewRecipe()
      } else if (hasInvalidItems) {
        console.log('최대 시도 횟수에 도달했습니다.')
      } else {
        // 유효한 응답을 받았으면 재시도 카운트 리셋
        setRetryCount(0)
      }

      console.log('문장으로 분리된 데이터:', parsedSentences)
    }
  }, [recipeResponse])

  const handleRestart = () => {
    if (recipeOptions.length > 0) {
      generateRecipe(recipeOptions, text)
    }
  }

  const handleDone = () => {
    navigate('/')
  }

  const handlePost = () => {
    navigate('/community/write', {
      state: {
        title: sentences?.recommendation || '',
        contents: (sentences?.recommendedItems || []).join('\n'),
      },
    })
  }

  const handleToggle = () => {
    setIsToggled((prev) => !prev)
  }

  if (loading) {
    return <LoadingSplash />
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <header>
          <div className="pt-7 pl-[17px] pr-[19px] pb-[11px] w-[390px] border-b border-b-200">
            <div className="flex flex-row gap-[90px] items-center">
              <Link to={'/recipe'}>
                <img src={arrow} alt="arrow" className="rotate-90" />
              </Link>
              <div className="flex-grow font-SB00 text-[18px] leading-[140%] text-nowrap">
                나만의 편의점 레시피
              </div>
            </div>
          </div>
        </header>
        <section className="px-4">
          <div
            className="relative flex justify-between mt-4 px-[14px] py-[16.5px] bg-Main2 border border-Main rounded-xl font-M00 text-[16px] text-nowrap text-[#000000] mb-[30px] z-20 cursor-pointer"
            onClick={handleToggle}
          >
            <div className="flex flex-row justify-center gap-[10px] ">
              <img src={requireCheck} alt="require check icon" />
              <div>요청 사항 확인하기</div>
            </div>
            <img
              src={downArrow}
              alt="toggle require field"
              className={` ${isToggled ? 'rotate-180' : ''}`} // 템플릿 리터럴로 클래스명 처리
            />
          </div>
          {/* 요소 토글 */}
          {isToggled && ( // isToggled가 true일 때만 렌더링
            <div className="w-[358px] bg-100 border border-200 rounded-b-xl -mt-[40px] pb-3 z-0 mb-[30px]">
              <div className="px-5 pt-5 w-full inline-flex flex-wrap gap-[10px]">
                <RecipeOption
                  content={recipeResponse?.data.selectedCost || ''}
                  isReturn={true}
                />
                <RecipeOption
                  content={recipeResponse?.data.selectedConvenienceStore || ''}
                  isStore={true}
                  isReturn={true}
                />
                <RecipeOption
                  content={recipeResponse?.data.koreanKeyword || ''}
                  isKeyword={true}
                  isReturn={true}
                />
              </div>
            </div>
          )}

          <div className="flex px-[20px] py-[10px] gap-[10px] mb-5 w-[358px] bg-100  rounded-[5px] font-M00 text-[14px] leading-[135%]">
            <img src={chef} alt="chef hat" className="self-start" />
            <div className="font-M00 text-[14px] leading-[135%] whitespace-pre-wrap break-words min-h-fit">
              {sentences?.recommendation}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            {items.map((item, index) => (
              <RecipeItem
                key={index}
                name={item.name}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>

          <div className="px-5 py-3 flex flex-row gap-[10px] bg-100 rounded-xl mt-5">
            <img src={price} alt="price icon" />
            <div>{recipeResponse?.data.selectedCost}</div>
          </div>

          <div className="pt-[14px] pb-[34px] fixed flex bottom-0 gap-[10px] bg-white">
            <button onClick={handleRestart}>
              <img src={restart} alt="restart" />
            </button>
            <button
              onClick={handleDone}
              className="flex px-[36.5px] py-[17.5px] justify-center bg-Main rounded-xl"
            >
              <div className="font-SB00 text-lg text-[#000000] text-nowrap">
                완료하기
              </div>
            </button>
            <button
              onClick={handlePost}
              className="flex px-[11px] py-[17.5px] justify-center bg-200 rounded-xl"
            >
              <div className="font-SB00 text-lg text-[#000000] text-nowrap">
                게시판 공유하기
              </div>
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
