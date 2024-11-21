export interface contentResponse {
  post_id: number
  author: string
  author_profile_url: string
  created_at: string
  title: string
  content: string
  likes: number
  like_user: string[]
  liked_by_me: boolean
  post_category: string
}
