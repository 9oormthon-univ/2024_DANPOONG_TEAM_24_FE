export interface addressResponse {
  id: number
  latitude: number
  longitude: number
  priority: number
  roadAddressName?: string
}

export interface addressListResponse {
  code: number
  data: addressResponse[]
}
