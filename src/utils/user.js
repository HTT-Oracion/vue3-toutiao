import store from '@/store'
import { Toast } from 'vant'
import { login, sendSms } from '@/api/user'
export const useLogin = async userData => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  });
  try {
    const { data } = await login(userData)
    Toast.success('登陆成功');
    store.commit('setUser', data.data)
  }
  catch (err) {
    Toast.fail('手机号码或验证码错误，请重试!');
    console.log('登录失败', err)

  }
}

//登录失败
export const useFailed = (error) => {
  if (error.errors[0]) {
    Toast({
      message: error.errors[0].message, // 提示消息
      position: 'top'
    })
  }
}
//发送验证码
export const useSendSms = async (ref, mobile, show) => {
  try {
    await ref.value.validate('mobile')
    await sendSms(mobile)
    if (!show) {
      show = true
    }
    console.log(show);
  } catch (err) {
    let message = ''
    if (err && err.response && err.response.status === 429) {
      message = '发送太频繁了，请稍后重试'
    } else if (err.name === 'mobile') {
      message = err.message
    } else {
      message = '发送失败，请稍后重试'
    }
    Toast({
      message, // 提示消息
      position: 'top'
    })
  }
}