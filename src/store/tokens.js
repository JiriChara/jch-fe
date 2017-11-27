import client from '@/utils/client';
import localStore from '@/utils/localStore';

export default {
  namespaced: true,

  state: {
    jwt: null,
    error: null,
    isLoading: false,
  },

  actions: {
    create({ commit }, { data, config } = {}) {
      commit('createStart');

      return client.post('/api/tokens', data, config)
        .then((res) => {
          const { jwt } = res.data;

          commit('setJWT', jwt);

          localStore.set('jwt', jwt);

          return res;
        })
        .catch((err) => {
          commit('createError', err);

          return Promise.reject(err);
        });
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

    createError(state, err) {
      state.isLoading = false;
      state.error = err;
    },
  },
};
