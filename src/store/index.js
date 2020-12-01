import { createStore } from 'vuex'
import { getItem, setItem } from '@/utils/storage'

//token
const USER_KEY = 'userToken'
export default createStore({
  state: {
    user: getItem(USER_KEY),
    isRouterAlive: true
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    },
    setRouterAlive (state, bol) {
      state.isRouterAlive = bol
    }
  },
  actions: {
  },
  modules: {
  }
})
