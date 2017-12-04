<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-content>
          <div v-if="!isLoadingArticles || isLoadingNextArticlePage">
            <jch-article
              v-for="article in articleList"
              :key="article.id"
              :article="article">
            </jch-article>

            <nav class="level" v-if="!isLoadingNextArticlePage && !isLoadingArticles">
              <p class="level-item has-text-centered">
                <button
                  class="button"
                  @click.prevent="onFetchNextPage"
                  v-if="hasNextArticlesPage">
                  more..
                </button>
              </p>
            </nav>
          </div>

          <b-notification v-if="!isLoadingArticles && !articleList.length" type="is-info" has-icon :closable="false">
            Ooops, no articles found..
          </b-notification>

          <nav class="level" v-if="isLoadingArticles">
            <p class="level-item has-text-centered">
              <jch-loader></jch-loader>
            </p>
          </nav>

          <p slot="side">
            <jch-sidebar-about-me-small></jch-sidebar-about-me-small>
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
  import JchSidebarAboutMeSmall from '@/components/sidebar/AboutMeSmall';

  export default {
    name: 'articles',

    metaInfo: {
      title: 'Blog',
    },

    components: {
      JchArticle,
      JchArticleFilter,
      JchContent,
      JchHero,
      JchSidebarAboutMeSmall,
    },

    data() {
      return {
        title: 'Blog',
        subtitle: '..whatever bothers me',
        isLoadingNextArticlePage: false,
      };
    },

    computed: {
      ...mapGetters('articles', {
        articleList: 'list',
        isLoadingArticles: 'isLoading',
        hasNextArticlesPage: 'hasNextPage',
        currentArticlesPage: 'currentPage',
      }),

      ...mapState([
        'route',
      ]),
    },

    methods: {
      ...mapActions('articles', {
        fetchArticles: 'fetchList',
      }),

      fetchData({ nextPage = false } = {}) {
        this.isLoadingNextArticlePage = nextPage;

        const config = {
          params: {
            sort: {
              column: 'published_at',
              direction: 'desc',
            },
            byType: 'Article',
            published: true,
            ...this.route.query,
            page: {
              number: nextPage ? this.currentArticlesPage + 1 : 1,
              size: 3,
            },
          },
        };

        return this.fetchArticles({ config })
          .then(() => {
            this.isLoadingNextArticlePage = false;
            this.$Progress.finish();
          })
          .catch(() => {
            this.isLoadingNextArticlePage = false;
            this.$Progress.fail();
          });
      },

      onFetchNextPage() {
        this.fetchData({ nextPage: true });
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
