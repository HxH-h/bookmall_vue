import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '未登录用户',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsInVzZXJuYW1lIjoiaHhoIiwiZXhwIjoxNzIzMDMyNTIwfQ.2WdoceH1kxHHWiifqmA0esW5u_azteqh50acIcT1QY4',
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
