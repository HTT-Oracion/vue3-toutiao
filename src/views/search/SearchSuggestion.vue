<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <template #title>
        <div v-html="highlight(str)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { getSearchSuggestions } from '@/api/search'
//防抖
import { debounce } from 'loadsh'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      //联想列表
      suggestions: []
    })
    const highlight = (str) => {
      return str.replace(new RegExp(props.searchText, 'gi'),
        `<span style="color: red">${props.searchText}</span>`)
    }
    watch(() => props.searchText, debounce(async () => {
      const { data } = await getSearchSuggestions(props.searchText)
      state.suggestions = data.data.options
    }, 200), {
      immediate: true
    })
    return {
      ...toRefs(state),
      highlight
    }
  }
}
</script>

<style>
</style>