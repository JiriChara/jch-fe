import BasePerimeter from '@/perimeters/BasePerimeter';

export default new BasePerimeter({
  purpose: 'signUp',

  can: {
    route() {
      // Disable sign-up for now
      return false;
    },
  },
});
