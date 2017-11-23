import client from '@/utils/client';
import localStore from '@/utils/localStore';

export default {
  namespaced: true,

  state: {
    currentUser: null,
  },

  actions: {
    async fetch({ commit }) {
      try {
        const res = await client.get('/api/me');
        const { data } = res;

        commit('setCurrentUser', data);

        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },

    logout({ commit }) {
      commit('setCurrentUser', null);

      Promise.resolve(localStore.remove('jwt'));
    },
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
};
