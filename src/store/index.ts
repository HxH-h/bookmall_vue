import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '未登录用户',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsInVzZXJuYW1lIjoiaHhoIiwiZXhwIjoxNzIyOTYzMzk5fQ.GEmJ5WVCm8q_jvlUn7HLJxsTTCmBCTMv7CRzfqsk3j0',
  },
  getters: {

  },
  mutations: {
    setToken(state, user){
      state.token = user.token
      state.name = user.name
    }
  },
  actions: {

  },
  modules: {

  }
})
