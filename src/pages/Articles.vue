<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-content>
          <nav class="level">
            <div class="level-left">
            </div>

            <div class="level-right">
              <div class="level-item" v-if="$isAllowed('create')">
                <router-link class="button" :to="{ name: 'new-article' }">
                  <b-icon pack="fa" icon="plus"></b-icon>

                  <span>
                    Create Article
                  </span>
                </router-link>
              </div>
            </div>
          </nav>

          <div v-if="!isLoadingArticles || isLoadingNextArticlePage">
            <jch-article
              v-for="article in articleList"
              key="article.id"
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

          <nav class="level">
            <p class="level-item has-text-centered">
              <jch-loader v-if="isLoadingArticles" />
            </p>
          </nav>

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
  import articlesPerimeter from '@/perimeters/articles';

  export default {
    name: 'articles',

    components: {
      JchArticle,
      JchArticleFilter,
      JchContent,
      JchHero,
    },

    perimeters: [
      articlesPerimeter,
    ],

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
