<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人资料"
      left-arrow
      @click-left="$router.back"
    />
    <input
      type="file"
      accept="image/*"
      hidden
      @change="onFileChange($event)"
      ref="photoRef"
    />
    <van-cell title="头像" is-link center @click="$refs.photoRef.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link @click="editNameShow = true">
      <span>{{ user.name }}</span>
    </van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="editGenderShow = true"
    >
    </van-cell>
    <van-cell title="生日" is-link @click="editBirthdayShow = true">
      <span>{{ user.birthday }}</span>
    </van-cell>
    <!-- 编辑昵称 -->
    <van-popup
      v-model:show="editNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <user-name
        v-if="editNameShow"
        @close="editNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 修改性别 -->
    <van-popup v-model:show="editGenderShow" position="bottom">
      <user-gender
        v-if="editGenderShow"
        v-model="user.gender"
        @close="editGenderShow = false"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model:show="editBirthdayShow" position="bottom">
      <user-birthday
        v-if="editBirthdayShow"
        v-model="user.birthday"
        @close="editBirthdayShow = false"
      />
    </van-popup>
    <!-- 修改头像 -->
    <van-popup
      v-model:show="editPhotoShow"
      position="bottom"
      class="photo-popup"
      :style="{ height: '100%' }"
    >
      <user-photo
        v-if="editPhotoShow"
        :file="previewPhoto"
        @close="editPhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import UserName from './UserName'
import UserGender from './UserGender'
import UserBirthday from './UserBirthday'
import UserPhoto from './UserPhoto'
import { getUserProfile } from '@/api/user'
import { onMounted, reactive, ref, toRefs } from 'vue'
export default {
  name: 'UserProfile',
  components: {
    UserName,
    UserGender,
    UserBirthday,
    UserPhoto
  },
  setup () {
    const state = reactive({
      user: {},
      editNameShow: false,
      editGenderShow: false,
      editBirthdayShow: false,
      editPhotoShow: false,
      previewPhoto: null
    })
    const photoRef = ref(null)
    const getInfo = async () => {
      const { data } = await getUserProfile()
      // console.log(data);
      state.user = data.data
    }
    const onFileChange = (e) => {
      // console.log(e);
      const file = e.target.files[0]
      state.previewPhoto = file
      state.editPhotoShow = true
      console.log(window.URL.createObjectURL(file));
      console.log(state.previewPhoto);
      e.target.value = ''
    }
    onMounted(() => {
      getInfo()
    })
    return {
      ...toRefs(state),
      photoRef,
      onFileChange
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
.photo-popup {
  background-color: #000;
}
</style>