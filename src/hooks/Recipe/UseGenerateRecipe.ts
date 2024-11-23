import { useState } from 'react'
import defaultAxios from '../../api/defaultAxios'

export interface RecipeOption {
  display: string
  value: string | number
}

export const useGenerateRecipe = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recipeResponse, setRecipeResponse] = useState<string | null>(null)

  const generateRecipe = async (options: RecipeOption[]) => {
    setLoading(true)
    setError(null)

    const requestBody = {
      display: '레시피 생성 요청',
      value: options,
    }

    try {
      const response = await defaultAxios.post(
        '/recipes/generate',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response?.data?.data?.recipeResult) {
        setRecipeResponse(response.data.data.recipeResult)
      } else {
        setError('응답 데이터 형식이 올바르지 않습니다.')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '요청 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return {
    recipeResponse,
    loading,
    error,
    generateRecipe,
  }
}
