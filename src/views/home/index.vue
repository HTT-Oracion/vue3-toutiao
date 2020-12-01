<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <template #title>
        <van-button class="search-btn" round type="primary" icon="search">
          搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        v-for="item in channels"
        :key="item.id"
        :title="item.name"
        class="tab-item"
      >
        <article-list :channel="item"></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './ArticleList'
import { useGetUserChannels } from '@/utils/user'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  setup () {
    const state = reactive({
      active: 0,
      channels: []
    })
    onMounted(async () => {
      state.channels = await useGetUserChannels()
      console.log(state.channels)
    })
    return {
      ...toRefs(state)
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
  }
}
</style>