<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人资料"
      left-arrow
      @click-left="$router.back"
    />
    <van-cell title="头像" is-link center>
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link>
      <span>{{ user.name }}</span>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender === 1 ? '男' : '女'">
    </van-cell>
    <van-cell title="生日" is-link>
      <span>{{ user.birthday }}</span>
    </van-cell>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'UserProfile',
  setup () {
    const state = reactive({
      user: {}
    })
    const getInfo = async () => {
      const { data } = await getUserProfile()
      // console.log(data);
      state.user = data.data
    }
    onMounted(() => {
      getInfo()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
</style>