/**
 * 评论相关请求
 */
import request from '@/utils/request'

/**
 * @method 获取文章评论
 * @param params:type source offset limit
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
