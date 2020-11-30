<template>
  <div class="my-container">
    <van-cell-group>
      <van-cell center>
        <template #title>
          <span>昵称</span>
        </template>
        <template #icon>
          <van-image
            width="66"
            height="66"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
        <template #default>
          <van-button size="small" round>编辑资料</van-button>
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item>
          <template #icon><span>8</span></template>
          <template #text>
            <span>头条</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon><span>88</span></template>
          <template #text>
            <span>关注</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon><span>64</span></template>
          <template #text>
            <span>粉丝</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon><span>5</span></template>
          <template #text>
            <span>获赞</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-grid :column-num="2">
      <van-grid-item
        icon-prefix="iconfont"
        icon="iconfont iconshoucang"
        text="收藏"
      />
      <van-grid-item
        icon-prefix="iconfont"
        icon="iconfont iconlishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" />
    <van-cell title="退出登录" />
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style>
</style>