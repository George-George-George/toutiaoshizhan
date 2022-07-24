import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    // 获取历史记录的TOKEN
    history: JSON.parse(localStorage.getItem('HEIMATOUTIAO_HISTORY')) || [],
    newsId: ''
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
      setToken(payload)
    },
    // 建立历史记录的TOKEN
    setHistory(stmate, payload) {
      if (localStorage.getItem('HEIMATOUTIAO_HISTORY') == null) {
        localStorage.setItem('HEIMATOUTIAO_HISTORY', JSON.stringify([]))
      }
      const res = JSON.parse(localStorage.getItem('HEIMATOUTIAO_HISTORY'))
      res.push(payload)
      localStorage.setItem('HEIMATOUTIAO_HISTORY', JSON.stringify(res))
    },
    // 移除历史记录的TOKEN
    removeHistory() {
      localStorage.removeItem('HEIMATOUTIAO_HISTORY')
    },
    getNewsId(state, msg) {
      state.newsId = msg
    }
  },
  actions: {},
  modules: {}
})
