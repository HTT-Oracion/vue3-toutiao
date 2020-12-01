<template>
  <router-view v-if="isRouterAlive" />
</template>
<script>
import { onMounted, reactive, toRefs, watch } from 'vue'
import store from '@/store'
export default {
  setup () {
    const state = reactive({
      isRouterAlive: store.state.isRouterAlive
    })
    watch(() => store.state.isRouterAlive,
      () => {
        state.isRouterAlive = store.state.isRouterAlive
        console.log(state.isRouterAlive);
      })

    return {
      ...toRefs(state)
    }

  }

}
</script>
