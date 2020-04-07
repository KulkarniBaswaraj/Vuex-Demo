import Vue from "vue";
import Vuex from "vuex";
import axios from "../../_http/axios-http";
import router from '../../router/index'

Vue.use(Vuex);

const state = {
   userData: {},
   token: null,
};
const getters = {
   getNewUserDetail(state, getters) {
      return `Username is : ${state.userData}` 
   }
};
const mutations = {
   authUser(state, userData) {
      console.log(userData);
      state.token = userData.token;
      state.userData = userData.user;
      if (state.token) {
         localStorage.setItem('token', state.token);
         axios.defaults.headers.common['Authorization'] = state.token;
         router.push('/home');
      }
   },
   regUser(state, userData) {
      router.push('/login');
   }
};
const actions = {

   signUp({ commit }, authData) {
      axios.post('/registerUser', authData).then(res => {
         console.log(res);
         commit('regUser', res.data)
      }).catch(err => {
         console.log(err);
      });
   },

   login({ commit }, authData) {
      axios.post('/user/login', authData).then(res => {
         commit('authUser', res.data)
      }).catch(err => {
         console.log(err);
      });
   },
   logout() {
      axios.post('/users/logout').then(res => {
         localStorage.clear();
         router.push('/login');
      }).catch(e => {
         console.log(e);
      });
   }
};

export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations
}

