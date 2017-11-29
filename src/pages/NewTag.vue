<template>
  <div>
    <jch-hero :title="title"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-tag-form @submit="onSubmit" @reset="onReset" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchTagForm from '@/components/tags/Form';

  export default {
    name: 'new-tag',

    metaInfo: {
      title: 'Create New Tag',
    },

    components: {
      JchHero,
      JchTagForm,
    },

    data() {
      return {
        title: 'Create New Tag',
      };
    },

    methods: {
      ...mapActions('tags', {
        createTag: 'create',
      }),

      onSubmit(tag) {
        this.$Progress.start();

        return this.createTag({ data: { tag } })
          .then(() => {
            router.push({ name: 'articles' });

            this.$snackbar.open({
              message: 'Tag was succcessfully created.',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Cannot create a tag.',
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
