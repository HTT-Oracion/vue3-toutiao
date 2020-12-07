<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(comment, index) in commentsList"
        :key="index"
        :title="comment.content"
      />
    </van-list>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  setup (props) {
    const state = reactive({
      commentsList: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    })
    const onLoad = async () => {
      const { data } = await getComments({
        type: props.type,
        source: props.source,
        offset: state.offset,
        limit: state.limit
      })
      console.log(data);
      const { results } = data.data
      state.commentsList.push(...results)
      state.loading = false
      if (results.length) {
        state.offset = data.data.last_id
      } else {
        state.finished = true
      }
    }
    onMounted(() => {
      // onLoad()
    })
    return {
      ...toRefs(state),
      onLoad
    }
  }
}
</script>

<style>
</style>