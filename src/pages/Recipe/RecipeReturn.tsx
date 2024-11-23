import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import arrow from '../../assets/common/Arrow.svg'
import restart from '../../assets/recipe/Restart.svg'
import Cn from '../../utils/Cn'
import { useGenerateRecipe } from '../../hooks/Recipe/UseGenerateRecipe'
import useMypage from '../../hooks/MyPage/useMyPage'
import LoadingSplash from '../Splash/LoadingSplash'

export default function RecipeReturn() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { profileInfo } = useMypage()

  const { recipeResponse, loading, error, generateRecipe } = useGenerateRecipe()

  // location.state에서 recipeOptions 가져오기
  const recipeOptions = location.state?.recipeOptions || []

  // textarea 높이 자동 조절 함수
  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto' // 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px` // 스크롤 높이로 설정
    }
  }

  // 컴포넌트 마운트 시 레시피 요청 및 높이 조절
  useEffect(() => {
    if (recipeOptions.length > 0) {
      generateRecipe(recipeOptions)
    } else {
      console.error('Recipe options not provided')
    }
  }, [recipeOptions])

  // textarea 높이 조절
  useEffect(() => {
    adjustHeight()
  }, [recipeResponse])

  const handleRestart = () => {
    if (recipeOptions.length > 0) {
      generateRecipe(recipeOptions)
    }
  }

  const handleDone = () => {
    navigate('/')
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
          <div className="pt-[14px] font-R00 text-lg text-[#000000] mb-4">
            {profileInfo?.name || '사용자'}님을 위한 레시피를 준비했어요!
          </div>
          <textarea
            ref={textareaRef}
            name="return"
            id="return recipe"
            value={recipeResponse || ''}
            readOnly
            className={Cn(
              'px-[10px] py-[62.5px] mb-[130px] w-[358px] bg-100 border border-200 rounded-[5px]',
              'resize-none font-M00 text-[14px] leading-[135%] focus:outline-none'
            )}
          />
          <div className="pt-[14px] pb-[34px] fixed flex bottom-0 gap-5 bg-white">
            <button
              onClick={handleRestart}
              className="flex items-center gap-[px] px-[27px] py-[18px] bg-200 border border-200 rounded-xl"
            >
              <img src={restart} alt="restart" />
              <div className="font-SB00 text-lg">초기화</div>
            </button>
            <button
              onClick={handleDone}
              className="flex w-[211.29px] py-[18px] justify-center bg-Main rounded-xl"
            >
              <div className="font-SB00 text-lg text-[#000000] text-nowrap">
                완료하기
              </div>
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
