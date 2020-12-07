<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }"
  >
    <template #title>
      <div class="title van-multi-ellipsis--l3">{{ article.title }}</div>
    </template>
    <template #label>
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="img" fit="cover" class="cover-item" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ relative(article.pubdate) }}</span>
      </div>
    </template>
    <template #default>
      <van-image
        class="right-cover"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </template>
  </van-cell>
</template>

<script>
import { getRelativeTime } from '@/utils/formater'
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup () {
    const relative = (time) => {
      return getRelativeTime(time)
    }
    return {
      relative
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  :deep(.van-cell__value) {
    flex: unset;
    // width: 116px;
    // height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}
</style>