<template>
  <div class="columns">
    <div class="column">
      <nav class="level" v-if="isLoadingAboutMe">
        <p class="level-item has-text-centered">
          <jch-loader></jch-loader>
        </p>
      </nav>

      <div class="content" v-if="aboutMeSmall && !isLoadingAboutMe">
        <h4>{{ aboutMeSmall.title }}</h4>
        <jch-article-content :article="aboutMeSmall"></jch-article-content>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import JchArticleContent from '@/components/articles/Content';

  export default {
    name: 'jch-sidebar-about-me-small',

    components: {
      JchArticleContent,
    },

    computed: {
      ...mapGetters('aboutMe', {
        aboutMeList: 'list',
        isLoadingAboutMe: 'isLoading',
      }),

      ...mapState([
        'route',
      ]),

      aboutMeSmall() {
        return this.aboutMeList.filter(article => article.type === 'AboutSmall')[0];
      },
    },

    methods: {
      ...mapActions('aboutMe', {
        fetchAboutMe: 'fetchList',
      }),

      fetchData() {
        const config = {
          params: {
            sort: {
              column: 'published_at',
              direction: 'desc',
            },
            byType: 'AboutSmall',
            page: {
              size: 1,
            },
          },
        };

        return this.fetchAboutMe({ config })
          .then(() => this.$Progress.finish())
          .catch(() => this.$Progress.fail());
      },
    },

    watch: {
      $route: 'fetchData',
    },

    created() {
      this.fetchData();
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';

  .content {
    h4 {
      color: $theme-color-2;
      font-family: 'Barrio', cursive;
    }
  }
</style>
