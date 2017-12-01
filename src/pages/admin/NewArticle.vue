<template>
  <jch-article-form @submit="onSubmit" @reset="onReset"></jch-article-form>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchArticleForm from '@/components/articles/Form';

  export default {
    name: 'admin-new-article',

    metaInfo: {
      title: 'Create New Article',
    },

    components: {
      JchArticleForm,
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
