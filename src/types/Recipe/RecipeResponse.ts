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
    recipeParagraphs: string[] // 레시피 문단 배열
    koreanKeyword: string // 한글 키워드
    selectedCost?: string
    selectedConvenienceStore: string
  }
}
