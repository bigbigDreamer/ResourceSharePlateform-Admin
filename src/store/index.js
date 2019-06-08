import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state,//状态
  mutations,
  actions,
  getters
})
