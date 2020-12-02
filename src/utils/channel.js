/**
 * 频道相关请求工具函数
 */
import { getAllChannel } from '@/api/channel'

export const useGetAllChannel = async () => {
  const { data } = await getAllChannel()
  return data
}