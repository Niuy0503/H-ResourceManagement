import { LoginAPI } from '@/api'
import { getUserInfoAPI, getUserDetailByIdAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    token: null,
    userinfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, userinfo) {
      state.userinfo = userinfo
    },
    REMOVE_USERINFO(state) {
      state.userinfo = {}
    }
  },
  actions: {
    async LoginAction({ commit }, Logindata) {
      const data = await LoginAPI(Logindata)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      const data = await getUserInfoAPI()
      const data1 = await getUserDetailByIdAPI(data.userId)
      const result = { ...data, ...data1 }
      commit('SET_USERINFO', result)
      return JSON.parse(JSON.stringify(result))
    }
  }
}
