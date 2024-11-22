import { useState, useEffect } from 'react'
import defaultAxios from '../../api/defaultAxios'
import { recipeOptionResponse } from '../../types/Recipe/RecipeResponse'

export const useRecipeOptions = () => {
  const [priceOptionData, setPriceOptionData] = useState<
    { content: string; isSelected: boolean }[]
  >([])

  const [storeOptionData, setStoreOptionData] = useState<
    { content: string; isSelected: boolean }[]
  >([])

  const [keywordOptionData, setKeywordOptionData] = useState<
    { content: string; isSelected: boolean }[]
  >([])

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchRecipeOptions = async () => {
      try {
        const response = await defaultAxios.get('/recipes/options')
        const recipeData: recipeOptionResponse[] = response.data.data

        // '최대 금액 선택' 옵션 데이터 설정
        const priceData =
          recipeData.find((option) => option.display === '최대 금액 선택')
            ?.value || []
        setPriceOptionData(
          priceData.map((option) => ({
            content: option.display,
            isSelected: false, // 초기값은 선택되지 않음
          }))
        )

        // '편의점 선택' 옵션 데이터 설정
        const storeData =
          recipeData.find((option) => option.display === '편의점 선택')
            ?.value || []
        setStoreOptionData(
          storeData.map((option) => ({
            content: option.display,
            isSelected: false, // 초기값은 선택되지 않음
          }))
        )

        // '키워드' 옵션 데이터 설정
        const keywordData =
          recipeData.find((option) => option.display === '키워드')?.value || []
        setKeywordOptionData(
          keywordData.map((option) => ({
            content: option.display,
            isSelected: false, // 초기값은 선택되지 않음
          }))
        )
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsError(true)
          setErrorMessage('API 요청 실패: ' + error.message)
        } else {
          setIsError(true)
          setErrorMessage('알 수 없는 오류 발생')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipeOptions()
  }, [])

  return {
    priceOptionData,
    storeOptionData,
    keywordOptionData,
    isLoading,
    isError,
    errorMessage,
    setPriceOptionData,
    setStoreOptionData,
    setKeywordOptionData,
  }
}
