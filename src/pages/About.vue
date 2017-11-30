<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-article-content :article="about" v-if="about && !isLoadingArticles"></jch-article-content>

        <b-notification v-if="!isLoadingArticles && !about" type="is-info" has-icon :closable="false">
          Ooops, can't find anything about me. :-(
        </b-notification>

        <nav class="level" v-if="isLoadingArticles">
          <p class="level-item has-text-centered">
            <jch-loader></jch-loader>
          </p>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import JchArticleContent from '@/components/articles/Content';
  import JchContent from '@/components/layout/Content';
  import JchHero from '@/components/layout/Hero';

  export default {
    name: 'about',

    metaInfo: {
      title: 'About Me',
    },

    components: {
      JchArticleContent,
      JchContent,
      JchHero,
    },

    data() {
      return {
        title: 'About',
        subtitle: '..who the.. ?',
      };
    },

    computed: {
      ...mapGetters('articles', {
        articleList: 'list',
        isLoadingArticles: 'isLoading',
      }),

      ...mapState([
        'route',
      ]),

      about() {
        return this.articleList.filter(article => article.type === 'About')[0];
      },
    },

    methods: {
      ...mapActions('articles', {
        fetchArticles: 'fetchList',
      }),

      fetchData() {
        const config = {
          params: {
            sort: {
              column: 'published_at',
              direction: 'desc',
            },
            byType: 'About',
          },
        };

        return this.fetchArticles({ config })
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
