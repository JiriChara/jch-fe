<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-project-form v-if="project" :project="project" @submit="onSubmit" @reset="onReset" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchProjectForm from '@/components/projects/Form';

  export default {
    name: 'edit-project',

    metaInfo() {
      return {
        title: `Edit ${this.project.name}`,
      };
    },

    components: {
      JchProjectForm,
      JchHero,
    },

    data() {
      return {
        title: 'Edit Project',
      };
    },

    computed: {
      ...mapState([
        'route',
      ]),

      ...mapGetters('projects', {
        projectBySlug: 'byId',
      }),

      project() {
        return this.projectBySlug(this.route.params.slug);
      },

      subtitle() {
        return this.project ? this.project.title : '';
      },
    },

    methods: {
      ...mapActions('projects', {
        fetchProject: 'fetchSingle',
        updateProject: 'update',
      }),

      fetchData() {
        this.$Progress.start();

        return this.fetchProject({ id: this.route.params.slug })
          .then(() => this.$Progress.finish())
          .catch(() => this.$Progress.fail());
      },

      onSubmit(project) {
        this.$Progress.start();

        return this.updateProject({ id: project.slug, data: project })
          .then(() => {
            router.push({ name: 'projects' });

            this.$snackbar.open({
              message: 'Project was succcessfully updated.',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Cannot update a project.',
              type: 'is-danger',
            });

            this.$Progress.fail();
          });
      },

      onReset() {
        router.push({ name: 'projects' });
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
