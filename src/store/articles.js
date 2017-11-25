import Vue from 'vue';
import createCRUDModule from 'vuex-crud';

import client from '@/utils/client';

const idAttribute = 'slug';

export default createCRUDModule({
  resource: 'articles',

  idAttribute,

  client,

  state: {
    paginationMeta: {},
  },

  getters: {
    total(state) {
      return state.paginationMeta.total;
    },

    currentPage(state) {
      return state.paginationMeta.page;
    },

    perPage(state) {
      return state.paginationMeta.perPage;
    },

    hasNextPage(state, getters) {
      return state.list.length < getters.total;
    },
  },

  mutations: {
    fetchListSuccess(state, response) {
      const { data, headers } = response;

      const perPage = parseInt(headers['x-per-page'], 10);
      const total = parseInt(headers['x-total'], 10);
      const page = parseInt(headers['x-page'], 10);

      data.forEach((m) => {
        Vue.set(state.entities, m[idAttribute].toString(), m);
      });

      state.paginationMeta = {
        perPage,
        total,
        page,
      };

      if (page > 1) {
        state.list.push(...data.map(m => m[idAttribute].toString()));
      } else {
        state.list = data.map(m => m[idAttribute].toString());
      }

      state.isFetchingList = false;
      state.fetchListError = null;
    },
  },
});
