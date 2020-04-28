import Vue from "vue";
import Vuex from "vuex";
import axios from "../../_http/axios-http";

Vue.use(Vuex)

const state = {
  usersList: []
}
const getters = {}
const mutations = {
  userData(state, res) {
    if(res.status == 1) {
      state.usersList = res.data.result;
    }
  }
}
const actions = {
  async getAllUsers({ commit }, payload) {
    try {
      const res = await axios.post('/usersList', payload);
      commit('userData', res);
      return res
    }
    catch (err) {
      return err      
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
