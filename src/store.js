import Vue from 'vue';
import Vuex from 'vuex';
import auth from './services/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('spotivueToken') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        auth
          .login(user)
          .then(resp => {
            if (resp && resp.data) {
              const token = resp.data.token;
              const user = resp.data.user;
              localStorage.setItem('spotivueToken', token);
              auth.setAuthHeaderToken(token);
              commit('auth_success', token, user);
              resolve(resp);
            }
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('spotivueToken');
            auth.deleteAuthHeaderToken();
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('auth_logout');
        localStorage.removeItem('spotivueToken');
        auth.deleteAuthHeaderToken();
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});
