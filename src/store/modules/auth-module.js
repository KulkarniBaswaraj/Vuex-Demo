import Vue from "vue";
import Vuex from "vuex";
import axios from "../../_http/axios-http";
import router from '../../router/index'

Vue.use(Vuex);

const state = {
   userData: localStorage.getItem('userData') != undefined ? JSON.parse(localStorage.getItem('userData')) : {},
   token: null,
   resetToken: null,
   toggleMenu: false
};
const getters = {
   getNewUserDetail(state, getters) {
      return `Username is : ${state.userData}`
   },
   getUserDetails(state, getters) {
      return state.userData;
   },
   getUserAbbr(state, getters) {
      const name = state.userData.name.split(" ");
      let abbr = "";
      if (name.length > 1) {
         abbr = name[0][0] + name[1][0];
      } else {
         abbr = name[0][0] + name[0][1];
      }
      return abbr.toUpperCase();
   }
};
const mutations = {
   authUser(state, userData) {
      state.token = userData.token;
      state.userData = userData.user;
      localStorage.setItem('userData', JSON.stringify(userData.user));
      if (state.token) {
         localStorage.setItem('token', state.token);
         axios.defaults.headers.common['Authorization'] = state.token;
         router.push('/home');
      }
   },
   regUser(state, userData) {
      setTimeout(() => {
         router.push('/login');
      }, 3000);
   },
   toggle(state) {
      state.toggleMenu = !state.toggleMenu;
   }
};
const actions = {

   async signUp({ commit }, authData) {
      try {
         const res = await axios.post('/registerUser', authData);
         if (res.status) {
            commit('regUser', res.result.user);
         }
         return res;
      }
      catch (err) {
         return err;
      }
   },

   async login({ commit }, authData) {
      try {
         const res = await axios.post('/user/login', authData);
         if (res.status) {
            commit('authUser', res.result);
         }
         return res;
      }
      catch (err) {
         return err;
      }
   },

   logout() {
      axios.post('/users/logoutAll').then(res => {
         localStorage.clear();
         router.push('/login');
      }).catch(err => err);
   },

   async genResetToken({ commit }, payload) {
      try {
         const res = await axios.post('/users/resetPassToken', payload);
         return res;
      }
      catch (err) {
         return err;
      }
   },
   
   async resetPassword({ commit }, payload) {
      try {
         const res = await axios.post('/users/reset-password', payload);
         return res;
      }
      catch (err) {
         return err;
      }
   }
};

export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations
}

