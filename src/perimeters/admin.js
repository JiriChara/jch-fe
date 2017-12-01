
import BasePerimeter from '@/perimeters/BasePerimeter';

export default new BasePerimeter({
  purpose: 'signUp',

  can: {
    route() {
      return this.isAdmin();
    },
  },
});
