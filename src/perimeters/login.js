import BasePerimeter from '@/perimeters/BasePerimeter';

export default new BasePerimeter({
  purpose: 'login',

  can: {
    route() {
      return this.isNotLoggedIn();
    },
  },
});
