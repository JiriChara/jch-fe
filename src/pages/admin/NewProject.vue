<template>
  <jch-project-form @submit="onSubmit" @reset="onReset">
  </jch-project-form>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchProjectForm from '@/components/projects/Form';

  export default {
    name: 'admin-new-project',

    metaInfo: {
      title: 'Create New Project',
    },

    components: {
      JchHero,
      JchProjectForm,
    },

    data() {
      return {
        title: 'Create New Project',
      };
    },

    methods: {
      ...mapActions('projects', {
        createProject: 'create',
      }),

      onSubmit(project) {
        this.$Progress.start();

        return this.createProject({ data: { project } })
          .then(() => {
            router.push({ name: 'projects' });

            this.$snackbar.open({
              message: 'Project was succcessfully created.',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Cannot create a project.',
              type: 'is-danger',
            });

            this.$Progress.fail();
          });
      },

      onReset() {
        router.push({ name: 'projects' });
      },
    },
  };
</script>
