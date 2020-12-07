/**
 * 搜索相关请求
 */
import request from '@/utils/request'

/**
 * @method 全部频道列表请求
 * 
 */
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q // 联想建议关键词
    }
  })
}

/**
 * @method 搜索结果请求
 * 
 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}


/**
 * @method 搜索历史请求
 * 
 */
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
