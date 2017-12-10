<template>
  <b-table :data="projectList" detailed>
    <template slot-scope="props">
      <b-table-column label="ID" numeric>
        {{ props.row.id }}
      </b-table-column>

      <b-table-column label="Name">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column label="Published?">
        {{ isProjectPublished(props.row) }}
      </b-table-column>
    </template>

    <template slot="detail" slot-scope="props">
      <article class="content">
        <jch-project-form
          :project="props.row"
          @submit="onSubmit"
          @reset="onReset">
        </jch-project-form>
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
  import JchProjectForm from '@/components/projects/Form';

  export default {
    name: 'admin-project-table',

    components: {
      JchProjectForm,
    },

    computed: {
      ...mapGetters('projects', {
        projectList: 'list',
        isLoadingProjects: 'isLoading',
      }),

      ...mapState([
        'route',
      ]),
    },

    methods: {
      ...mapActions('projects', {
        fetchProjects: 'fetchList',
        updateProject: 'update',
      }),

      isProjectPublished(project) {
        if (!project.publishedAt) {
          return false;
        }

        return moment(project.publishedAt) < moment();
      },

      fetchData() {
        const config = {
          params: {
            page: {
              size: 25,
            },
          },
        };

        return this.fetchProjects({ config })
          .then(() => {
            this.$Progress.finish();
          })
          .catch(() => {
            this.$Progress.fail();
          });
      },

      onSubmit(project) {
        this.$Progress.start();

        return this.updateProject({ id: project.slug, data: { project } })
          .then(() => {
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
