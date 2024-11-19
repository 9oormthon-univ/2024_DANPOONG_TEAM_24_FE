import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import arrow from '../../assets/common/Arrow.svg'
import restart from '../../assets/recipe/Restart.svg'
import Cn from '../../utils/Cn'

export default function RecipeReturn() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  // textarea 높이 자동 조절 함수
  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto' // 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px` // 스크롤 높이로 설정
    }
  }

  // 컴포넌트 마운트 시 높이 조절
  useEffect(() => {
    adjustHeight()
  }, [])

  const handleRestart = () => {
    // 데이터 다시 받는 로직 추가해야 함
    navigate('/recipeReturn')
  }

  const handleDone = () => {
    navigate('/')
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
            00님을 위한 레시피를 준비했어요!
          </div>
          <textarea
            ref={textareaRef}
            name="return"
            id="return recipe"
            value={`GS25에서 9,000원으로 건강한 식사를 구성하기 위해 다음과 같은 제품들을 추천해요. 
            
 리얼프라이스 슬라이스 닭가슴살 갈릭맛 
    가격: 약 2,300원 
    특징: 하림에서 제조한 국내산 닭가슴살로, 부드럽고 촉촉한 식감이 특징입니다.
    네이버 블로그 
            
샐러드를 만드는 사람들 치킨 앤 에그 콥 샐러드 
    가격: 약 4,100원 
    특징: 신선한 채소와 함께 치킨, 계란 등이 포함된 샐러드로, 한 끼 식사로 적합합니다. 
    네이버 블로그 

리얼프라이스 플레인 요거트 
    가격: 약 1,500원 
    특징: 무가당 플레인 요거트로, 샐러드 드레싱 대용이나 디저트로 활용할 수 있습니다. 
총합: 약 7,900원 
                
추천 식사 구성: 
    메인: '리얼프라이스 슬라이스 닭가슴살 갈릭맛'을 '샐러드를 만드는 사람들 치킨 앤 에그 콥 샐러드'에 추가하여 단백질을 보충하고 포만감을 높입니다.
    사이드: '리얼프라이스 플레인 요거트'를 샐러드 드레싱으로 활용하거나 식사 후 디저트로 섭취합니다.`}
            readOnly
            className={Cn(
              'px-[10px] py-[20px] mb-[130px] w-[358px] bg-100 border border-200 rounded-[5px]',
              'resize-none font-M00 text-[14px] leading-[135%] focus:outline-none'
            )}
          />
          <div className="pt-[14px] pb-[34px] fixed flex bottom-0 gap-5 bg-white">
            <button
              onClick={handleRestart}
              className="flex items-center gap-[px] px-[27px] py-[18px] border border-200 rounded-xl"
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
