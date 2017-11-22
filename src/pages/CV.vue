<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-article-content :article="cv" v-if="cv && !isLoadingArticles"></jch-article-content>

        <b-notification v-if="!isLoadingArticles && !cv" type="is-info" has-icon :closable="false">
          Ooops, no CV found..
        </b-notification>

        <jch-loader v-if="isLoadingArticles" />
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
    name: 'cv',

    components: {
      JchArticleContent,
      JchContent,
      JchHero,
    },

    data() {
      return {
        title: 'Curriculum Vitae',
        subtitle: '..in case of offers',
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

      cv() {
        return this.articleList.filter(article => article.type === 'CV')[0];
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
            byType: 'CV',
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
