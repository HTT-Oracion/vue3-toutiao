/**
 * 频道相关请求
 */
import request from '@/utils/request'

/**
 * @method 全部频道列表请求
 * 
 */
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
}
/**
 * @method  添加频道
 */
export const addUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
/**
 * @method  删除频道
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}