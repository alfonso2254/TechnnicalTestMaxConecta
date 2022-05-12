import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import Auth from './Auth'
import Task from './Task'

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Task
  }
})
