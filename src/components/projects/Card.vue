<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3" v-if="project.image.url">
        <a :href="project.url">
          <img :src="project.image.url" alt="Image" />
        </a>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <a :href="project.url" class="title">{{ project.name }}</a>
        </div>
      </div>

      <div class="content" v-markdown="project.description"></div>
    </div>

    <footer class="card-footer" v-if="$isAllowed('update')">
      <router-link :to="editProjectLink(project)" class="card-footer-item">Edit</router-link>
      <a @click="onProjectDestroy(project)" class="card-footer-item" v-if="$isAllowed('destroy')">Delete</a>
    </footer>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import markdown from '@/directives/markdown';
  import projectsPerimeter from '@/perimeters/projects';

  export default {
    name: 'jch-project-card',

    props: {
      project: {
        type: Object,
        required: true,
      },
    },

    directives: {
      markdown,
    },

    perimeters: [
      projectsPerimeter,
    ],

    methods: {
      ...mapActions('projects', {
        destroyProject: 'destroy',
      }),

      onProjectDestroy(project) {
        this.$dialog.confirm({
          title: 'Delete Project?',
          message: `Are you sure you want to <strong>delete</strong> project <em>${project.name}</em>? This action cannot be undone.`,
          confirmText: 'Delete',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.$Progress.start();

            this.destroyProject({ id: project.slug })
              .then(() => {
                this.$Progress.finish();
                this.$snackbar.open({
                  message: 'The project was successfully deleted.',
                  type: 'is-success',
                });
              })
              .catch(() => {
                this.$Progress.fail();
                this.$snackbar.open({
                  message: 'Cannot delete the project.',
                  type: 'is-danger',
                });
              });
          },
        });
      },

      editProjectLink(project) {
        return {
          name: 'edit-project',
          params: {
            slug: project.slug,
          },
        };
      },
    },
  };
</script>
