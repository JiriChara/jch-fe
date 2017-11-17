import createCRUDModule from 'vuex-crud';

export default createCRUDModule({
  resource: 'articles',

  idAttribute: 'slug',

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
