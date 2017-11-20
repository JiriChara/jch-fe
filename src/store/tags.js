import createCRUDModule from 'vuex-crud';

import client from '@/utils/client';

export default createCRUDModule({
  resource: 'tags',

  client,

  idAttribute: 'slug',
});
