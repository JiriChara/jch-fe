import createCRUDModule from 'vuex-crud';

import client from '@/utils/client';

export default createCRUDModule({
  resource: 'articles',

  idAttribute: 'slug',

  client,

  state: {
    paginationMeta: {},
  },

  onFetchListSuccess(state, { headers }) {
    state.paginationMeta = {
      perPage: headers['per-page'],
      total: headers.total,
    };
  },
});
