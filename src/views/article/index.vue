<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center class="user-info">
        <template #icon>
          <van-image
            fit="cover"
            round
            :src="article.aut_photo"
            class="avatar"
          />
        </template>
        <template #title>
          <span class="name">{{ article.aut_name }}</span>
        </template>
        <template #label>
          <span class="pubdate">{{ getRelative(article.pubdate) }}</span>
        </template>
        <template #default>
          <van-button
            :type="article.is_followed ? 'default' : 'primary'"
            size="small"
            round
            class="follow-btn"
            :icon="article.is_followed ? '' : 'plus'"
            @click="onFollow"
            :loading="isLoading"
            >{{ article.is_followed ? '已关注' : '关注' }}</van-button
          >
        </template>
      </van-cell>
      <div class="markdown-body" v-html="article.content" ref="myRef"></div>
      <!-- 评论区 -->
      <comment-list :source="articleId" />
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" color="#777" />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>
<script>
import CommentList from './CommentList'
import '@/assets/css/github-markdown.css'
import { nextTick, onMounted, reactive, ref, toRefs } from 'vue'
import { getRelativeTime } from '@/utils/formater'
import { ImagePreview, Toast } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    CommentList
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      article: {},
      isLoading: false
    })
    const myRef = ref(null)
    //相对时间
    const getRelative = (time) => {
      return getRelativeTime(time)
    }
    //处理图片预览
    const handlePreview = () => {
      const pictures = myRef.value.querySelectorAll('img')
      const picPaths = []
      pictures.forEach((pic, index) => {
        picPaths.push(pic.src)
        pic.onclick = function () {
          ImagePreview({
            images: picPaths,
            startPosition: index,
          });
        }
      });
    }
    //加载文章详情
    const loadArticle = async () => {
      const { data } = await getArticleById(props.articleId)
      state.article = data.data
      //强制更新
      nextTick(() => {
        handlePreview()
      })
    }
    //处理关注用户的逻辑
    const onFollow = async () => {
      state.isLoading = true
      if (state.article.is_followed) {
        await deleteFollow(state.article.aut_id)
      } else {
        await addFollow(state.article.aut_id)
      }
      state.article.is_followed = !state.article.is_followed
      state.isLoading = false
    }
    //处理收藏文章的逻辑
    const onCollect = async () => {
      Toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (state.article.is_collected) {
          await deleteCollect(props.articleId)
        } else {
          await addCollect(props.articleId)
        }
        state.article.is_collected = !state.article.is_collected
        // state.isLoading = false
        Toast.success(`${state.article.is_collected ? '' : '取消'}收藏成功`)
      } catch {
        Toast.fail('收藏失败！')
      }
    }
    //处理 点赞 
    const onLike = async () => {
      //  state.isLoading = true
      Toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (state.article.attitude === 1) {
          await deleteLike(props.articleId)
          state.article.attitude === -1
        } else {
          await addLike(props.articleId)
          state.article.attitude = 1
        }
        // state.isLoading = false
        Toast.success(`${state.article.attitude === 1 ? '' : '取消'}点赞成功`)
      } catch {
        Toast.fail('操作失败！')
      }
    }
    onMounted(async () => {
      loadArticle()
    })
    return {
      ...toRefs(state),
      myRef,
      getRelative,
      onFollow,
      onCollect,
      onLike
    }
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.title {
  padding: 14px;
  font-size: 20px;
  color: #3a3a3a;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}

//底部
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>