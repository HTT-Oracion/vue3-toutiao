<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <template #title>
        <van-button
          class="search-btn"
          round
          type="primary"
          icon="search"
          to="/search"
        >
          搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 文章频道 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        v-for="item in channels"
        :key="item.id"
        :title="item.name"
        class="tab-item"
      > 
      <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <template #nav-right>
        <van-icon
          name="wap-nav"
          class="wap-nav-wrap"
          @click="isEditChannelShow = true"
        ></van-icon>
      </template>
    </van-tabs>
    <van-popup
      v-model:show="isEditChannelShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      teleport="body"
    >
      <channel-edit
        :userChannels="channels"
        v-model="active"
        @close="isEditChannelShow = false"
        @update-channels="updateChannels"
      ></channel-edit>
      <!--    @new-active="updateActive" -->
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './ArticleList'
import ChannelEdit from './ChannelEdit'
import { getItem } from '@/utils/storage'
import store from '@/store'
import { getUserChannels } from '@/api/user'
import { getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  setup () {
    const { ctx } = getCurrentInstance()
    console.log(ctx);
    const state = reactive({
      //控制频道标签的重新渲染
      vanTab: 0,
      active: 0,
      channels: [],
      isEditChannelShow: false
    })
    // state.active = store.state.tabActive
    //切换标签
    // const updateActive = (index) => {
    //   state.active = index
    //   // console.log('from homeIndex', state.active);
    // }
    // 获取频道列表
    const useGetUserChannels = async () => {
      let realChannels = []
      if (store.state.user) {
        const { data } = await getUserChannels()
        realChannels = data.data.channels
      } else {
        const localChannels = getItem('user-channels')
        if (localChannels) {
          realChannels = localChannels
        } else {
          const { data } = await getUserChannels()
          realChannels = data.data.channels
        }
      }
      // if (state.vanTab === 0) {
      //   state.vanTab += 1;
      // }
      state.channels = realChannels
    }
    const updateChannels = (index) => {
      state.channels.splice(index, 1)
    }
    onMounted(() => {
      useGetUserChannels()
    })

    // watch(() => state.channels, () => {
    //   useGetUserChannels()
    // })
    return {
      ...toRefs(state),
      updateChannels
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  :deep(.van-nav-bar__title) {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    border: none;
    background-color: #53a7ff;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    padding-right: 33px;
    :deep(.van-tab) {
      min-width: 80px;
      border-right: 1px solid #f6f6f6;
      border-bottom: 1px solid #f6f6f6;
      // padding-left: 5px;
      // padding-right: 5px;
    }
    :deep(.van-tabs__line) {
      width: 15px !important;
      height: 3px;
      background: #168b88;
      bottom: 20px;
    }
    .wap-nav-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 33px;
      height: 43px;
      background-color: #fff;
      opacity: 0.8;
      .van-icon {
        font-size: 24px;
      }
    }
  }
}
</style>