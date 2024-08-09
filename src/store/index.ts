import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '未登录用户',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsInVzZXJuYW1lIjoiaHhoIiwiZXhwIjoxNzIzMjA1MDUzfQ.bI0F-x7yIGnal7pdVsCJQMxviG84Uq7dRDxHDyPN8pY',
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
