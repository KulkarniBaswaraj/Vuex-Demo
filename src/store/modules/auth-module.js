import Vue from "vue";
import Vuex from "vuex";
import axios from "../../_http/axios-http";
import router from '../../router/index'

Vue.use(Vuex);

const getUserData = () => {

   try {
      if (JSON.parse(sessionStorage.getItem('userData'))) {
         return JSON.parse(sessionStorage.getItem('userData'));
      }
   } catch (error) {
      router.push('/login');
   }
}
const state = {
   userData: getUserData(),
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
      sessionStorage.setItem('userData', JSON.stringify(userData.user));
      if (state.token) {
         sessionStorage.setItem('token', state.token);
         axios.defaults.headers.common['Authorization'] = state.token;
         router.push('/home');
      }
   },
   setUser(state, userData) {
      sessionStorage.setItem('userData', JSON.stringify(userData));
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
            commit('regUser', res.data.result.user);
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
            commit('authUser', res.data.result);
         }
         return res;
      }
      catch (err) {
         return err;
      }
   },

   logout() {
      axios.post('/users/logoutAll').then(res => {
         sessionStorage.clear();
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
   },

   async updateUser({ commit }, authData) {
      try {
         const res = await axios.patch('/users/me', authData);
         if (res.status) {
            commit('setUser', res.data.result);
         }
         return res;
      }
      catch (err) {
         return err;
      }
   },
};

export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations
}

