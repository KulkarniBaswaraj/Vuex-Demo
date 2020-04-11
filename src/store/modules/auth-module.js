import Vue from "vue";
import Vuex from "vuex";
import axios from "../../_http/axios-http";
import router from '../../router/index'

Vue.use(Vuex);

const state = {
   userData: {},
   token: null,
   resetToken: null
};
const getters = {
   getNewUserDetail(state, getters) {
      return `Username is : ${state.userData}` 
   }
};
const mutations = {
   authUser(state, userData) {
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
         if(res.data.status) {
            commit('regUser', res.data.result.user)
         }
      }).catch(err => {
         console.log(err);
      });
   },

   login({ commit }, authData) {
       return axios.post('/user/login', authData).then(res => {
         if(res.data.status) {
             commit('authUser', res.data.result)
         }
         return res;
      }).catch(err => {
         console.log(err);
         return err;
      });
   },

   logout() {
      axios.post('/users/logoutAll').then(res => {
         localStorage.clear();
         router.push('/login');
      }).catch(e => {
         console.log(e);
      });
   },
   genResetToken({commit}, payload) {
      axios.post('/users/resetPassToken', payload).then(res => {
         console.log('res', res);
      }).catch(e => {
         console.log(e)
      });
   },
   resetPassword({commit}, payload) {
      axios.post('/users/reset-password', payload).then(res => {
         console.log('reset-res', res);
      }).catch(e => {
         console.log(e)
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

