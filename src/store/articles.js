import createCRUDModule from 'vuex-crud';

export default createCRUDModule({
  resource: 'articles',

  idAttribute: 'slug',
});
