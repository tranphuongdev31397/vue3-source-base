import { Http } from '@/http'

const ENDPOINT = '/posts'

export const fetchPosts = async () => {
  const res = await Http.get<ResponseSuccess<any>>(ENDPOINT, {
    postId: 1
  })
  return res?.data || res
}
