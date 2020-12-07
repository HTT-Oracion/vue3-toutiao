<template>
  <div class="search-result">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      page: 1,  //页码
      perPage: 10 //每页的搜索结果数量
    })
    const onLoad = async () => {
      const { data } = await getSearchResult({
        page: state.page,
        per_page: state.perPage,
        q: props.searchText
      })
      const { results } = data.data
      state.list.push(...results)
      state.loading = false
      if (results.length) {
        state.page++
      } else {
        state.finished = true
      }
    }
    return {
      ...toRefs(state),
      onLoad
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>