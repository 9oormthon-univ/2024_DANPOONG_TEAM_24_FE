// 레시피 옵션 응답
export interface recipeOptionResponse {
  display: string
  value: {
    display: string
    value: string | number
  }[]
}

// gpt 응답
export interface RecipeResponse {
  code: number
  data: {
    recipeResult: string
  }
}
