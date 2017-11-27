<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-article-form v-if="article" :article="article" @submit="onSubmit" @reset="onReset" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchArticleForm from '@/components/articles/Form';

  export default {
    name: 'new-article',

    components: {
      JchHero,
      JchArticleForm,
    },

    data() {
      return {
        title: 'Edit Article',
      };
    },

    computed: {
      ...mapState([
        'route',
      ]),

      ...mapGetters('articles', {
        articleBySlug: 'byId',
      }),

      article() {
        return this.articleBySlug(this.route.params.slug);
      },

      subtitle() {
        return this.article ? this.article.title : '';
      },
    },

    methods: {
      ...mapActions('articles', {
        fetchArticle: 'fetchSingle',
        updateArticle: 'update',
      }),

      fetchData() {
        this.$Progress.start();

        return this.fetchArticle({ id: this.route.params.slug })
          .then(() => this.$Progress.finish())
          .catch(() => this.$Progress.fail());
      },

      onSubmit(article) {
        this.$Progress.start();

        return this.updateArticle({ id: article.slug, data: { article } })
          .then(() => {
            router.push({ name: 'articles' });

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
        router.push({ name: 'articles' });
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
