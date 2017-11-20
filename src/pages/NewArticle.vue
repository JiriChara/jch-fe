<template>
  <div>
    <jch-hero :title="title"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-article-form @submit="onSubmit" @reset="onReset" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchArticleForm from '@/components/articles/Form';

  export default {
    name: 'new-project',

    components: {
      JchHero,
      JchArticleForm,
    },

    data() {
      return {
        title: 'Create New Article',
      };
    },

    methods: {
      ...mapActions('articles', {
        createArticle: 'create',
      }),

      onSubmit(article) {
        this.$Progress.start();

        return this.createArticle({ data: { article } })
          .then(() => {
            router.push({ name: 'articles' });

            this.$snackbar.open({
              message: 'Article was succcessfully created.',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Cannot create a article.',
              type: 'is-danger',
            });

            this.$Progress.fail();
          });
      },

      onReset() {
        router.push({ name: 'articles' });
      },
    },
  };
</script>
