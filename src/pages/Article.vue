<template>
  <div v-if="article">
    <jch-hero :title="title">
      <jch-article-info-panel :article="article">
      </jch-article-info-panel>
    </jch-hero>

    <section class="section">
      <div class="container">
        <jch-article-content :article="article"></jch-article-content>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import JchArticle from '@/components/Article';
  import JchArticleContent from '@/components/articles/Content';
  import JchArticleInfoPanel from '@/components/articles/InfoPanel';
  import JchContent from '@/components/layout/Content';
  import JchHero from '@/components/layout/Hero';

  export default {
    name: 'article',

    metaInfo() {
      return {
        title: this.article.title,
      };
    },

    components: {
      JchArticle,
      JchArticleContent,
      JchArticleInfoPanel,
      JchContent,
      JchHero,
    },

    computed: {
      ...mapGetters('articles', {
        articleById: 'byId',
      }),

      ...mapState([
        'route',
      ]),

      article() {
        return this.articleById(this.route.params.slug);
      },

      title() {
        return this.article.title;
      },
    },

    methods: {
      ...mapActions('articles', {
        fetchSingleArticle: 'fetchSingle',
      }),

      fetchData() {
        return this.fetchSingleArticle({ id: this.route.params.slug })
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
