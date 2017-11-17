import createCRUDModule from 'vuex-crud';

export default createCRUDModule({
  resource: 'tags',

  idAttribute: 'slug',
});
