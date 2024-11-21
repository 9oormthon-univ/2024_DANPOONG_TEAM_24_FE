import { commentResponse } from './CommentResponse'
import { contentResponse } from './ContentResponse'

export interface getPostResponse {
  post_id: number
  author: string
  author_profile_url: string
  created_at: string
  title: string
  content: string
  likes: number
  like_user: string[]
  liked_by_me: boolean
  comments: commentResponse[]
  post_category: string
}

export interface getCategoryContentResponse {
  code: number
  data: contentResponse[]
}
