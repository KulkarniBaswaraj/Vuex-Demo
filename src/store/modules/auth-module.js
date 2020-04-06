import Vue from "vue";
import Vuex from "vuex";
import axios from "../../_http/axios-http";
import router from '../../router/index'

Vue.use(Vuex);

const state = {
   token: null,
   userId: null
};
const getters = {
   getNewUserDetail(state, getters) {
      return `Username is : ${state.userId}` 
   }
};
const mutations = {
   authUser(state, userData) {
      state.token = userData._id;
      state.userId = userData.username;
      if (state.token && state.userId) {
         localStorage.setItem('token', state.token);
         router.push('/dashboard');
      }
   },
};
const actions = {

   signUp({ commit }, authData) {
      axios.post('/users', authData).then(res => {
         console.log(res);
         commit('authUser', {
            _id: res.data._id,
            username: res.data.username
         })
      }).catch(err => {
         console.log(err);
      });
   },

   login({ commit }, authData) {
      axios.post('/users', authData).then(res => {
         console.log(res);
         commit('authUser', {
            _id: res.data._id,
            username: res.data.username
         })
      }).catch(err => {
         console.log(err);
      });
   },
};

export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations
}

