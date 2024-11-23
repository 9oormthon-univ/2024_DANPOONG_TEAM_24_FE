// 지피티한테 요청
export interface recipeRequest {
  display: string
  value: {
    display: string
    value: string | number
  }[]
}
