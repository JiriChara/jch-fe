import createCRUDModule from 'vuex-crud';

export default createCRUDModule({
  resource: 'projects',

  idAttribute: 'slug',
});
