<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="加载中..."
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem'
import { onMounted, reactive, toRefs } from 'vue'
import { useGetArticleList } from '@/utils/article'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const state = reactive({
      articles: [],
      timestamp: null,
      loading: false,
      finished: false,
      refreshing: false,
      isRefreshLoading: false,
      refreshSuccessText: ''
    })
    const onLoad = async () => {
      const { data } = await useGetArticleList(props.channel.id, state.timestamp || Date.now(), 1)
      state.articles.push(...data.results)
      state.loading = false
      // //如果还有数据，则把历史时间戳传入
      if (data.results.length) {
        state.timestamp = data.pre_timestamp
      } else {
        state.finished = true
      }
    }
    const onRefresh = async () => {
      //下拉刷新
      const { data } = await useGetArticleList(props.channel.id, Date.now(), 1)
      state.articles.unshift(...data.results)
      state.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.isRefreshLoading = false
      state.refreshSuccessText = `更新了${data.results.length}条数据`
    }
    return {
      ...toRefs(state),
      onLoad,
      onRefresh
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>