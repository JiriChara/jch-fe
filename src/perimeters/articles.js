import BasePerimeter from '@/perimeters/BasePerimeter';

export default new BasePerimeter({
  purpose: 'articles',

  can: {
    viewSingle() {
      return true;
    },

    viewList() {
      return this.isAllowed('viewSingle');
    },

    create() {
      return this.isAdmin();
    },

    update() {
      return this.isAdmin();
    },

    destroy() {
      return this.isAdmin();
    },
  },
});
