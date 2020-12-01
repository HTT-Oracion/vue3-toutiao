/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

/**
 * @method 登录请求
 * @param {*} data  包括手机号码&验证码
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
/**
 * @method 发送验证码请求
 * @param {} mobile 手机号码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
/**
 * @method 获取登录用户信息请求
 *
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}

/**
 * @method 获取用户频道列表的请求
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}