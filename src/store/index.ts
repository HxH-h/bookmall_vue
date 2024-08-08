import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '未登录用户',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsInVzZXJuYW1lIjoiaHhoIiwiZXhwIjoxNzIzMTE5OTQzfQ.8wMdLfyOxbPx9xpxhpzc2MHv-6vEwFMazXkqG-OVkkQ',
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
