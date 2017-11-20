import BasePerimeter from '@/perimeters/BasePerimeter';

export default new BasePerimeter({
  purpose: 'logout',

  can: {
    route() {
      return this.isLoggedIn();
    },
  },
});
