<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories')">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :title="history"
      :key="index"
      @click="onDelete(index, history)"
    >
      <!--  @click="$emit('search', history)" -->
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  setup (props, context) {
    const state = reactive({
      isDeleteShow: false
    })
    //删除单个
    const onDelete = (index, history) => {
      if (state.isDeleteShow) {
        props.searchHistories.splice(index, 1)
        setItem('search-histories', props.searchHistories)
        return
      }
      context.emit('search', history)
    }
    //删除多个
    return {
      ...toRefs(state),
      onDelete
    }
  }
}
</script>

<style>
</style>