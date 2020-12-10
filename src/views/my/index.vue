<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell center :border="false" class="base-info">
        <template #title>
          <span class="name">{{ currentUser.name }}</span>
        </template>
        <template #icon>
          <van-image
            round
            fit="cover"
            :src="currentUser.photo"
            class="avatar"
          />
        </template>
        <template #default>
          <van-button size="small" round class="editBtn" to="/userprofile"
            >编辑资料</van-button
          >
        </template>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <template #icon
            ><span class="count">{{ currentUser.art_count }}</span></template
          >
          <template #text>
            <span class="text">头条</span>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #icon
            ><span class="count">{{ currentUser.follow_count }}</span></template
          >
          <template #text>
            <span class="text">关注</span>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #icon
            ><span class="count">{{ currentUser.fans_count }}</span></template
          >
          <template #text>
            <span class="text">粉丝</span>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #icon
            ><span class="count">{{ currentUser.like_count }}</span></template
          >
          <template #text>
            <span class="text">获赞</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录 -->
    <div v-else class="not-login">
      <div
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img src="../../assets/img/手机.png" class="mobile" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <van-grid :column-num="2" :border="false" class="nav-grid mb-4">
      <van-grid-item
        icon-prefix="iconfont"
        icon="iconfont iconshoucang"
        text="收藏"
        class="nav-grid-item"
      />
      <van-grid-item
        icon-prefix="iconfont"
        icon="iconfont iconlishi"
        text="历史"
        class="nav-grid-item"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/userchat" class="mb-4" />
    <van-cell
      v-if="user"
      title="退出登录"
      class="logoutBtn"
      @click="onLogout"
    />
  </div>
</template>

<script>
import store from '@/store'
import { useGetCurrentUser, useLogout } from '@/utils/user'
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
export default {
  name: 'MyIndex',
  setup () {
    const state = reactive({
      //token
      user: '',
      //当前用户信息
      currentUser: {},
      //控制页面的刷新
      loginWrap: 0
    })
    const { ctx } = getCurrentInstance()
    //退出登录
    const onLogout = () => {
      useLogout()
    }
    onMounted(async () => {
      state.user = store.state.user
      state.currentUser = await useGetCurrentUser()
    })
    return {
      ...toRefs(state),
      onLogout
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url('../../assets/img/banner.png') no-repeat;
    background-size: cover;
    .base-info {
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background: unset;
      box-sizing: border-box;
      .avatar {
        height: 66px;
        width: 66px;
        margin-right: 11px;
        border: 1px solid #fff;
        box-sizing: border-box;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .editBtn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }

    :deep(.van-grid-item__content) {
      background: unset;
    }
  }
  /* 未登录 */
  .not-login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 180px;
    background: url('../../assets/img/banner.png') no-repeat;
    background-size: cover;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
  :deep(.nav-grid) {
    .nav-grid-item {
      height: 70px;
      .iconfont {
        font-size: 22px;
      }
      .iconshoucang {
        color: #eb5253;
      }
      .iconlishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logoutBtn {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 8px;
  }
}
</style>