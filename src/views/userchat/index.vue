<template>
  <div class="user-chat">
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="message-list" ref="messageRef">
      <van-cell
        :title="item.msg"
        v-for="(item, index) in messages"
        :key="index"
      />
    </van-cell-group>

    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息" :border="false" />
      <van-button type="success" size="small" @click="onSend" class="send-btn"
        >发送</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
export default {
  name: 'UserChat',
  setup () {
    const state = reactive({
      socket: null,
      message: '',
      messages: getItem('user-chat') || []
    })
    const messageRef = ref(null)
    const onSend = () => {
      const data = {
        msg: state.message,
        timestamp: Date.now()
      }
      state.messages.push(data)
      state.message = ''
    }
    //保证每次都在底部
    const scrollToBottom = () => {
      const list = messageRef.value
      list.scrollTop = list.scrollHeight
    }
    onMounted(() => {
      // const socket = io('http://ttapi.research.itcast.cn/')
      // state.socket = socket
      // //连接
      // socket.on('connect', () => {
      //   console.log('建立连接成功');
      // })
      // //断开
      // socket.on('disconnect', () => {
      //   console.log('断开连接了');
      // })
      // //接收服务端信息
      // socket.on('message', data => {
      //   state.messages.push(data)
      // })
      // scrollToBottom()
    })
    watch(() => state.messages, () => {
      setItem('user-chat', state.messages)
      nextTick(() => {
        scrollToBottom()
      })
    })
    return {
      ...toRefs(state),
      messageRef,
      onSend
    }
  }
}
</script>

<style lang="less" scoped>
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}

.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
  .send-btn {
    width: 80px;
  }
}
</style>