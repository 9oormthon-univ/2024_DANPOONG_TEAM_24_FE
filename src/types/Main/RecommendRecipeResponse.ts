// 추천 레시피 응답
export interface recommendRecipeResponse {
  recipeId: number
  recipeName: string
  description?: string
  imageUrl: string
  videoUrl: string
}

// 추천 레시피 리스트 응답
export interface recommendRecipeListResponse {
  code: number
  data: recommendRecipeResponse[]
}
