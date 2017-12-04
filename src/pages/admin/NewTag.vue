<template>
  <jch-tag-form @submit="onSubmit" @reset="onReset">
  </jch-tag-form>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchTagForm from '@/components/tags/Form';

  export default {
    name: 'admin-new-tag',

    metaInfo: {
      title: 'Create New Tag',
    },

    components: {
      JchTagForm,
    },

    methods: {
      ...mapActions('tags', {
        createTag: 'create',
      }),

      onSubmit(tag) {
        this.$Progress.start();

        return this.createTag({ data: { tag } })
          .then(() => {
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
        router.push({ name: 'admin-dashboard' });
      },
    },
  };
</script>
