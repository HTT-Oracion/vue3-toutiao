import { getArticleList } from '@/api/article'

/**
 * @method 获取文章列表
 * @param channel_id 频道ID
 * @param timestamp 时间戳 当前 | 历史
 * @param with_top 是否包含置顶
 */

export const useGetArticleList = async (channel_id, timestamp, with_top) => {
  const { data } = await getArticleList({
    channel_id,
    timestamp,
    with_top
  })
  console.log(data)
  return data
}