import jwtDecode from 'jwt-decode';

import client from '@/utils/client';
import localStore from '@/utils/localStore';

export default {
  namespaced: true,

  state: {
    jwt: null,
    error: null,
    isLoading: false,
    currentUser: null,
  },

  actions: {
    create({ commit }, { data, config } = {}) {
      commit('createStart');

      return client.post('/api/tokens', data, config)
        .then((res) => {
          const jwt = res.data.jwt;

          commit('setJWT', jwt);
          commit('setCurrentUser', jwt);

          localStore.set('jwt', jwt);

          return res;
        })
        .catch((err) => {
          commit('createError', err);

          return Promise.reject(err);
        });
    },

    loadCurrentUser({ commit }) {
      // TODO: do API request (to refresh roles etc...)
      commit('setCurrentUser', localStore.get('jwt'));
    },

    logout({ commit }) {
      commit('unsetCurrentUser');
      Promise.resolve(localStore.remove('jwt'));
    },
  },

  mutations: {
    createStart(state) {
      state.isLoading = true;
    },

    setJWT(state, jwt) {
      state.token = jwt;
      state.isLoading = false;
      state.error = false;
    },

    setCurrentUser(state, jwt) {
      state.currentUser = jwtDecode(jwt);
    },

    unsetCurrentUser(state) {
      state.currentUser = null;
    },

    createError(state, err) {
      state.isLoading = false;
      state.error = err;
    },
  },
};
