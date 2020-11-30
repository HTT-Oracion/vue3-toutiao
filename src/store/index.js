import { createStore } from 'vuex'
import { getItem, setItem } from '@/utils/storage'

//token
const USER_KEY = 'userToken'
export default createStore({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
