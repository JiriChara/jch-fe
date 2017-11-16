export default {
  namespaced: true,

  state: {
    isMobileMenuActive: false,
  },

  actions: {
    toggleMobileMenu({ commit }) {
      commit('toggleMobileMenu');
    },

    hideMobileMenu({ commit }) {
      commit('hideMobileMenu');
    },
  },

  mutations: {
    toggleMobileMenu(state) {
      state.isMobileMenuActive = !state.isMobileMenuActive;
    },

    hideMobileMenu(state) {
      state.isMobileMenuActive = false;
    },
  },
};
