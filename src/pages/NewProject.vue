<template>
  <div>
    <jch-hero :title="title"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-project-form @submit="onSubmit" @reset="onReset" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchProjectForm from '@/components/projects/Form';

  export default {
    name: 'new-project',

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
