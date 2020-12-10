import store from '@/store'
import router from '@/router'
import { Toast, Dialog } from 'vant'
import { useRoute } from 'vue-router'
import { login, sendSms, getCurrentUser, getUserChannels } from '@/api/user'
const route = useRoute()
/**
 * @method 登录
 * @param {*} userData 手机号码&验证码
 */
export const useLogin = async userData => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  });
  try {
    const { data } = await login(userData)
    Toast.success('登陆成功');
    store.commit('removeCachePage', 'LayoutIndex')
    store.commit('setUser', data.data)
    router.push(route.query.redirect || '/')
  }
  catch (err) {
    Toast.fail('手机号码或验证码错误，请重试!');
    console.log('登录失败', err)
  }
}

/**
 * @method 表单验证失败的函数
 * @param {*} error 
 */
export const useFailed = (error) => {
  if (error.errors[0]) {
    Toast({
      message: error.errors[0].message, // 提示消息
      position: 'top'
    })
  }
}
/**
 * @method 退出登录
 */
export const useLogout = () => {
  Dialog.confirm({
    title: '退出提示',
    message: '真的要退出登录吗？再考虑一下吧！',
  })
    .then(() => {
      store.commit('setUser', null)
    })
    .catch(() => {
      // on cancel
    });
}


/**
 * @method 刷新页面 
 *
 */

export const reload = () => {
  store.commit('setRouterAlive', false)
  setTimeout(() => {
    store.commit('setRouterAlive', true)
  }, 0)
}
/**
 * @method 发送验证码
 * @param {} ref 表单的引用
 * @param {} mobile 手机号码
 * @param {} show isCountDownShow
 */

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

/**
 * @method 获取当前用户信息
 */
export const useGetCurrentUser = async () => {
  const { data } = await getCurrentUser()
  console.log(data.data);
  return data.data
}

/**
 * @method 获取用户频道列表
 */
export const useGetUserChannels = async (vanTab) => {
  const { data } = await getUserChannels()
  console.log(data.data.channels);
  if (vanTab === 0) {
    vanTab += 1;
  }
  return data.data.channels
}

/**
 *     const useGetUserChannels = async () => {
      const { data } = await getUserChannels()
      console.log(data.data.channels);
      if (state.vanTab === 0) {
        state.vanTab += 1;
      }
      return data.data.channels
    }
 */