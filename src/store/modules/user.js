import { LoginAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async LoginAction({ commit }, Logindata) {
      const data = await LoginAPI(Logindata)
      commit('SET_TOKEN', data)
    }
  }
}
