<template>
  <b-table :data="articleList" detailed detail-key="id">
    <template slot-scope="props">
      <b-table-column label="ID" numeric>
        {{ props.row.id }}
      </b-table-column>

      <b-table-column label="Title">
        {{ props.row.title }}
      </b-table-column>

      <b-table-column label="Published?">
        {{ isArticlePublished(props.row) }}
      </b-table-column>
    </template>

    <template slot="detail" slot-scope="props">
      <article class="content">
        <jch-article-form
          :article="props.row"
          @submit="onSubmit"
          @reset="onReset">
        </jch-article-form>
      </article>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="frown-o" size="is-large"></b-icon>
          </p>

          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import moment from 'moment';

  import router from '@/router';
  import JchArticleForm from '@/components/articles/Form';

  export default {
    name: 'admin-article-table',

    components: {
      JchArticleForm,
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
        updateArticle: 'update',
      }),

      isArticlePublished(article) {
        if (!article.publishedAt) {
          return false;
        }

        return moment(article.publishedAt) < moment();
      },

      fetchData({ nextPage = false } = {}) {
        this.isLoadingNextArticlePage = nextPage;

        const config = {
          params: {
            page: {
              size: 999,
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

      onSubmit(article) {
        this.$Progress.start();

        return this.updateArticle({ id: article.slug, data: { article } })
          .then(() => {
            this.$snackbar.open({
              message: 'Article was succcessfully updated.',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Cannot update a article.',
              type: 'is-danger',
            });

            this.$Progress.fail();
          });
      },

      onReset() {
        router.push({ name: 'admin-dashboard' });
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
