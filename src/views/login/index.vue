<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录 / 注册"
      left-arrow
      @click-left="$router.back"
    />
    <!-- 登录表单 -->
    <van-form
      validate-first
      @submit="onLogin"
      @failed="onFailed"
      ref="loginFormRef"
      :show-error-message="false"
      :show-error="false"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="iconfont"
        left-icon="iconfont iconshouji"
        placeholder="请输入手机号"
        name="mobile"
        center
        :rules="loginFormRules.mobile"
      />
      <van-field
        v-model="user.code"
        icon-prefix="iconfont"
        left-icon="iconfont iconyanzhengma"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="loginFormRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            type="success"
            size="small"
            class="send-btn"
            :loading="isSendSmsLoading"
            @click="onSendSms"
            >验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrapper">
        <van-button class="login-btn" block native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useLogin, useFailed } from '@/utils/user'
import { sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  setup () {
    const state = reactive({
      user: {
        mobile: '17090086870',
        //验证码
        code: '246810'
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    })
    const loginFormRef = ref('')
    //登录
    const onLogin = () => {
      useLogin(state.user)
    }
    //登录失败
    const onFailed = (error) => {
      useFailed(error)
    }
    //发送验证码
    const onSendSms = async () => {
      try {
        await loginFormRef.value.validate('mobile')
        state.isSendSmsLoading = true
        await sendSms(state.user.mobile)
        state.isCountDownShow = true
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
      state.isSendSmsLoading = false
    }
    return {
      ...toRefs(state),
      loginFormRef,
      onLogin,
      onFailed,
      onSendSms
    }
  }
}
</script>

<style lang="less" scoped>
.send-btn {
  width: 76px;
  height: 23px;
  border: none;
  .van-button__text {
    font-size: 11px;
  }
}
.login-btn-wrapper {
  padding: 26px 16px;
  .login-btn {
    background: #67b0ff;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
  }
}
</style>