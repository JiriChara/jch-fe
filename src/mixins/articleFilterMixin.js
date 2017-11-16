import { mapState } from 'vuex';

import router from '@/router';

export default {
  created() {
    this.searchTerm = this.route.query.q || '';
  },

  data() {
    return {
      searchTerm: '',
    };
  },

  computed: {
    ...mapState([
      'route',
    ]),

    hasFilterApplied() {
      return !!(this.route.query.q || this.route.query.byTag);
    },
  },

  watch: {
    $route: 'onRoute',
  },

  methods: {
    onRoute() {
      const query = Object.assign({}, this.route.query);

      this.searchTerm = query.q || '';
    },

    onSelectTag(tagName) {
      const query = Object.assign({}, this.route.query);

      if (this.isTagSelected(tagName)) {
        delete query.byTag;
      } else {
        query.byTag = tagName;
      }

      router.push({ name: 'articles', query });
    },

    isTagSelected(tagName) {
      return tagName === this.route.query.byTag;
    },

    onSearch() {
      const query = Object.assign({}, this.route.query);

      if (this.searchTerm) {
        query.q = this.searchTerm;
      } else {
        delete query.q;
      }

      router.push({ name: 'blog', query });
    },

    onSearchClear() {
      this.searchTerm = '';

      const query = Object.assign({}, this.route.query);
      delete query.q;

      router.push({ name: 'blog', query });
    },

    onShowAll() {
      this.searchTerm = '';
      router.push({ name: 'blog' });
    },
  },
};
