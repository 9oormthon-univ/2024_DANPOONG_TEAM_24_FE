import { useEffect, useRef, useState } from 'react'
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

export default function RecipeReturn() {
  const textareaRef = useRef<HTMLDivElement>(null)
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
    if (recipeResponse && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      console.log('레시피 : ', recipeResponse)

      const parsedSentences = parseRecipeParagraphs(
        recipeResponse.data.recipeParagraphs
      )
      setSentences(parsedSentences) // 상태로 업데이트

      const recipeItems = parseRecipeItems(parsedSentences.recommendedItems)
      console.log('test:', parsedSentences.recommendedItems)
      setItems(recipeItems)
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
          <div className="flex justify-between mt-4 px-[14px] py-[16.5px] bg-Main2 border border-Main rounded-xl font-M00 text-[16px] text-nowrap text-[#000000] mb-4">
            <div className="flex flex-row justify-center gap-[10px] ">
              <img src={requireCheck} alt="require check icon" />
              <div>요청 사항 확인하기</div>
            </div>
            <img src={downArrow} alt="toggle require field" />
          </div>

          <div className="flex px-[20px] py-[10px] gap-[10px] mb-5 w-[358px] bg-100 border border-200 rounded-[5px] font-M00 text-[14px] leading-[135%]">
            <img src={chef} alt="chef hat" className="self-start" />
            <div ref={textareaRef}>{sentences?.recommendation}</div>
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
