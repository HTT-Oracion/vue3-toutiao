<template>
  <form action="/">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(searchText)"
      @cancel="$router.back()"
      @focus="onFocus"
      background="#3296fa"
    />
  </form>
  <search-result v-if="isResultShow" :searchText="searchText"></search-result>
  <search-suggestion
    v-else-if="searchText"
    :searchText="searchText"
    @search="onSearch"
  ></search-suggestion>
  <search-history
    v-else
    :searchHistories="searchHistories"
    @search="onSearch"
    @update-histories="deleteAll"
  ></search-history>
</template>

<script>
import SearchSuggestion from './SearchSuggestion'
import SearchHistory from './SearchHistory'
import SearchResult from './SearchResult'
import { setItem, getItem } from '@/utils/storage'
import { onMounted, reactive, toRefs, watch } from 'vue';
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  setup () {
    const state = reactive({
      searchText: '',
      searchHistories: getItem('search-histories') || [],
      isResultShow: true
    })
    //搜索
    const onSearch = (searchText) => {
      state.searchText = searchText
      const index = state.searchHistories.indexOf(searchText)
      if (index !== -1) {
        state.searchHistories.splice(index, 1)
      }
      state.searchHistories.unshift(searchText)
      setItem('search-histories', state.searchHistories)
      state.isResultShow = true
    }
    const onFocus = () => {
      state.isResultShow = false
    }
    //获取搜索历史
    const loadHistory = () => {
      const searchHistories = getItem('search-histories') || []
      state.searchHistories = searchHistories
    }
    onMounted(() => {
      loadHistory()
    })
    watch(() => state.searchHistories, () => {
      setItem('search-histories', state.searchHistories)
    })
    const deleteAll = () => {
      state.searchHistories = []
      // setItem('search-histories', state.searchHistories)
    }
    return {
      ...toRefs(state),
      onSearch,
      onFocus,
      deleteAll
    }
  }
}
</script>

<style>
</style>