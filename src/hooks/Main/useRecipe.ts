import { useState } from 'react'
import defaultAxios from '../../api/defaultAxios'
import { recommendRecipeListResponse } from '../../types/Main/RecommendRecipeResponse'

const useRecipe = () => {
  const [recipeList, setRecipeList] =
    useState<recommendRecipeListResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // 추천 레시피 리스트 조회
  const fetchGetRecipeList = async () => {
    try {
      setIsLoading(true)
      const response = await defaultAxios.get(`/recipes/recommendation`)
      console.log(response.data)
      setRecipeList(response.data)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return { fetchGetRecipeList, recipeList, isLoading, isError }
}

export default useRecipe
