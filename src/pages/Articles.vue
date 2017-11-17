<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-content>
          <jch-article
            v-if="!isLoadingArticles"
            v-for="article in articleList"
            key="article.id"
            :article="article">
          </jch-article>

          <b-notification v-if="!isLoadingArticles && !articleList.length" type="is-info" has-icon :closable="false">
            Ooops, no articles found..
          </b-notification>

          <jch-loader v-if="isLoadingArticles" />

          <p slot="side">
            <jch-article-filter></jch-article-filter>
          </p>
        </jch-content>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import JchArticle from '@/components/Article';
  import JchArticleFilter from '@/components/articles/Filter';
  import JchContent from '@/components/layout/Content';
  import JchHero from '@/components/layout/Hero';

  export default {
    name: 'articles',

    components: {
      JchArticle,
      JchArticleFilter,
      JchContent,
      JchHero,
    },

    data() {
      return {
        title: 'Blog',
        subtitle: '..whatever bothers me',
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
    },

    methods: {
      ...mapActions('articles', {
        fetchArticles: 'fetchList',
      }),

      fetchData() {
        const config = {
          params: this.route.query,
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
