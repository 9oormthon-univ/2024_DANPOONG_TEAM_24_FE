interface profile {
  email: string
  name: string
  profileUrl: string
}

export default interface profileResponse {
  code: number
  data: profile
}
