/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * @method 文章列表请求
 * @param {*} params 参数包括 channel_id timestamp with_top
 */
export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}