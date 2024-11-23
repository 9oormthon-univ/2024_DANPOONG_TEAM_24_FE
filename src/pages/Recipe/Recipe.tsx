import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RecipeOption from '../../components/Recipe/RecipeOption'
import Cn from '../../utils/Cn'
import AI from '../../assets/recipe/AI.svg'
import { useRecipeOptions } from '../../hooks/Recipe/UseOption'
import LoadingSplash from '../Splash/LoadingSplash'

export default function Recipe() {
  const [text, setText] = useState('') // 글자 상태
  const maxLength = 300 // 최대 글자수
  const navigate = useNavigate()

  const {
    priceOptionData,
    storeOptionData,
    keywordOptionData,
    isLoading,
    setPriceOptionData,
    setStoreOptionData,
    setKeywordOptionData,
  } = useRecipeOptions()

  if (isLoading) {
    return <LoadingSplash />
  }

  // recipeOptions 동적 생성 함수
  const createRecipeOptions = () => {
    const selectedPrice = priceOptionData.find((option) => option.isSelected)
    const selectedStore = storeOptionData.find((option) => option.isSelected)
    const selectedKeyword = keywordOptionData.find(
      (option) => option.isSelected
    )

    const recipeOptions = []

    if (selectedPrice) {
      recipeOptions.push({
        display: '최대 금액 선택',
        value: selectedPrice.content,
      })
    }

    if (selectedStore) {
      recipeOptions.push({
        display: '편의점 선택',
        value: selectedStore.content,
      })
    }

    if (selectedKeyword) {
      recipeOptions.push({
        display: '키워드',
        value: selectedKeyword.content,
      })
    }

    return recipeOptions
  }

  const handleSubmit = () => {
    // 필수 항목 검사
    const isPriceSelected = priceOptionData.some((option) => option.isSelected)
    const isStoreSelected = storeOptionData.some((option) => option.isSelected)
    const isKeywordSelected = keywordOptionData.some(
      (option) => option.isSelected
    )

    if (!isPriceSelected || !isStoreSelected || !isKeywordSelected) {
      alert('모든 필수 항목을 선택해주세요.') // 경고 알럿 표시
      return
    }

    // recipeOptions 생성
    const recipeOptions = createRecipeOptions()
    console.log('Generated Recipe Options:', recipeOptions)

    // 모든 조건이 충족되었을 경우 이동
    navigate('/recipeReturn', { state: { recipeOptions, text } }) // 추가 요청사항도 함께 전달
  }

  // 상태 토글 함수
  const toggleSelection = (
    data: { content: string; isSelected: boolean }[],
    setData: React.Dispatch<React.SetStateAction<typeof data>>,
    content: string
  ) => {
    setData((prev) =>
      prev.map((item) => ({
        ...item,
        isSelected: item.content === content, // 클릭된 항목만 true, 나머지는 false
      }))
    )
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value) // 글자 상태 업데이트
  }

  return (
    <>
      <div className="mb-[90px] flex flex-col items-center justify-center">
        <Header />
        <section className="mt-[7px] w-[390px] border-t border-200 ">
          <div className="mt-[20.05px] mx-4 px-[13px] py-[18px] w-[358px] flex justify-between bg-Main2 border border-Main rounded-xl cursor-pointer">
            <div className="flex flex-col gap-1 text-start">
              <div className="font-SB00 text-base">
                건강한 식사를 위한 나만의 AI 레시피
              </div>
              <div className="font-M00 text-xs text-400">
                추가요청사항을 작성하면 나에게 더 잘 맞는 레시피를 제공해요
              </div>
            </div>
          </div>
          <div className="mt-[14px] px-4 flex flex-col gap-[30px]">
            <div>
              <div className="font-M00 text-[16px] text-[#000000] leading-[135%]">
                1. 금액을 골라주세요
                <span className="pl-[6px] font-SB00 text-[12px] text-C400">
                  (필수)
                </span>
              </div>
              <div className="font-L00 text-xs text-C400 leading-[140%]">
                지역별로 금액차이가 있어요
              </div>
              <div className="mt-[10px] inline-flex gap-[10px]">
                {priceOptionData.map((price, index) => (
                  <RecipeOption
                    key={index}
                    content={price.content}
                    isSelected={price.isSelected}
                    onClick={() =>
                      toggleSelection(
                        priceOptionData,
                        setPriceOptionData,
                        price.content
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="font-M00 text-[16px] text-[#000000]">
                2. 편의점 종류를 골라주세요
                <span className="pl-[6px] font-SB00 text-[12px] text-C400">
                  (필수)
                </span>
              </div>
              <div className="mt-[10px] inline-flex gap-[10px]">
                {storeOptionData.map((store, index) => (
                  <RecipeOption
                    key={index}
                    content={store.content}
                    isSelected={store.isSelected}
                    isStore={true}
                    onClick={() =>
                      toggleSelection(
                        storeOptionData,
                        setStoreOptionData,
                        store.content
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="font-M00 text-[16px] text-[#000000] leading-[135%]">
                3. 레시피에 요청사항을 적어주세요
                <span className="pl-[6px] font-SB00 text-[12px] text-C400">
                  (필수)
                </span>
              </div>

              <div className="font-L00 text-xs text-C400 leading-[140%]">
                추천 키워드를 참고해 건강한 편의점 식사를 즐겨보세요
              </div>
              <div className="mt-[10px] inline-flex flex-wrap gap-[10px]">
                {keywordOptionData.map((keyword, index) => (
                  <RecipeOption
                    key={index}
                    content={keyword.content}
                    isKeyword={true}
                    isSelected={keyword.isSelected}
                    onClick={() =>
                      toggleSelection(
                        keywordOptionData,
                        setKeywordOptionData,
                        keyword.content
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="font-M00 text-[16px] text-[#000000] leading-[135%]">
                4. 추가로 원하는 내용이 있으면 입력해주세요!
                <span className="pl-[6px] font-SB00 text-[12px] text-C400">
                  (선택)
                </span>
              </div>
              <div className="mt-5 mb-[90px] flex flex-col gap-[9px]">
                <textarea
                  name="require"
                  id="Require recipe field"
                  placeholder="레시피에 요청사항을 적어주세요"
                  maxLength={maxLength} // 최대 글자수 제한
                  value={text} // 현재 상태 바인딩
                  onChange={handleTextChange} // 글자 상태 업데이트
                  className={Cn(
                    'pt-5 pl-[11px] w-[358px] h-[232px] bg-100 border border-200 rounded-xl',
                    'font-M00 text-[14px] resize-none focus:outline-none'
                  )}
                ></textarea>
                <div className="font-L00 text-xs text-C400 self-end">
                  {text.length}/{maxLength}
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              style={{
                background:
                  'linear-gradient(108deg, #FFE58C -15.89%, #FDD835 31.16%, #F78951 68.45%, #F4635E 90.25%)',
              }}
              className="flex w-[358px] h-[60px] justify-center items-center gap-[10px] fixed rounded-xl bottom-[112.5px] border border-200 text-black cursor-pointer"
            >
              <img src={AI} alt="AI" />
              <p className="text-lg font-SB00 font-normal leading-140">
                AI로 레시피 만들기
              </p>
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}
