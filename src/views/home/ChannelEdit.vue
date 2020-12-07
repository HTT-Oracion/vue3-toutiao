<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <template #title>
        <div class="channel-title">我的频道</div>
      </template>
      <van-button type="danger" size="mini" @click="isEdit = !isEdit">{{
        isEdit ? '完成' : '编辑'
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === channelActive }"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        @click="userChannelClick(channel, index)"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <template #title>
        <div class="channel-title">频道推荐</div>
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="add(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { useGetAllChannel } from '@/utils/channel'
import { addUserChannel, deleteUserChannel } from '@/api/channel'
import store from '@/store'
import { setItem } from '@/utils/storage'
import { computed, onMounted, reactive, toRefs } from 'vue';
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    channelActive: {
      type: Number,
      required: true
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      allChannels: [],
      isEdit: false
    })
    // console.log(props.userChannels);
    onMounted(async () => {
      const { data } = await useGetAllChannel()
      state.allChannels = data.channels
    })
    const recommendChannels = computed(() => {
      return state.allChannels.filter(channel => {
        return !props.userChannels.find(userChannel =>
          userChannel.id === channel.id
        )
      })
    })
    const add = async channel => {
      props.userChannels.push(channel)
      if (store.state.user) {
        await addUserChannel({
          channels: [{
            id: channel.id, seq: props.userChannels.length
          }]
        })
      } else {
        setItem('user-channels', props.userChannels)
      }
    }

    const userChannelClick = (channel, index) => {
      if (state.isEdit && index !== 0) {
        deleteChannel(channel, index)
      } else {
        switchChannel(index)
      }
    }
    const deleteChannel = async (channel, index) => {
      if (index <= props.channelActive) {
        emit('new-active', props.channelActive - 1)
        // store.commit('setTabActive', props.channelActive - 1)
      }
      props.userChannels.splice(index, 1)
      if (store.state.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', props.userChannels)
      }
    }
    const switchChannel = (index) => {
      emit('new-active', index)
      // store.commit('setTabActive', index)
      emit('close')
      console.log('from channel-edit', index);
    }
    console.log(recommendChannels);
    return {
      ...toRefs(state),
      recommendChannels,
      userChannelClick,
      add
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    :deep(.van-grid-item__content) {
      background-color: #f4f5f6;
      border: none;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    :deep(.van-grid-item__icon) {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
      z-index: 10;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>