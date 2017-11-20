import axios from 'axios';
import localStore from '@/utils/localStore';

axios.interceptors.request.use(
  (cfg) => {
    const jwt = localStore.get('jwt');

    if (jwt) {
      cfg.headers.common.Authorization = `Bearer ${jwt}`;
    }

    return cfg;
  },

  error => Promise.reject(error),
);

export default axios;
