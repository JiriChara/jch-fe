<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-content>
          <nav class="level">
            <div class="level-left">
            </div>

            <div class="level-right">
              <div class="level-item" v-if="$isAllowed('create')">
                <router-link class="button" :to="{ name: 'new-project' }">
                  <b-icon pack="fa" icon="plus"></b-icon>

                  <span>
                    Create Project
                  </span>
                </router-link>
              </div>
            </div>
          </nav>

          <b-notification v-if="!isLoadingProjects && !projectGroups.length" type="is-info" has-icon :closable="false">
            Ooops, no projects found..
          </b-notification>

          <nav class="level">
            <p class="level-item has-text-centered">
              <jch-loader v-if="isLoadingProjects" />
            </p>
          </nav>

          <div class="tile is-ancestor" v-for="group in projectGroups" v-if="!isLoadingProjects">
            <div class="tile is-12">
              <div class="tile is-parent is-6" v-for="project in group" :key="project.id">
                <article class="tile is-child is-12">
                  <jch-project-card :project="project" />
                </article>
              </div>
            </div>
          </div>

          <p slot="side">
            Custom content
          </p>
        </jch-content>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import JchContent from '@/components/layout/Content';
  import JchHero from '@/components/layout/Hero';
  import JchProjectCard from '@/components/projects/Card';
  import projectsPerimeter from '@/perimeters/projects';

  export default {
    name: 'projects',

    components: {
      JchContent,
      JchHero,
      JchProjectCard,
    },

    perimeters: [
      projectsPerimeter,
    ],

    data() {
      return {
        title: 'Projects',
        subtitle: '..some of my creations',
      };
    },

    computed: {
      ...mapGetters('projects', {
        projectList: 'list',
        isLoadingProjects: 'isLoading',
      }),

      projectGroups() {
        const chunkSize = 2;
        const list = this.projectList;

        return new Array(Math.ceil(list.length / chunkSize))
          .fill().map(() => list.splice(0, chunkSize));
      },
    },

    methods: {
      ...mapActions('projects', {
        fetchProjects: 'fetchList',
      }),

      fetchData() {
        const config = {
          params: {
            sort: {
              column: 'created_at',
              direction: 'desc',
            },
          },
        };

        this.$Progress.start();

        return this.fetchProjects({ config })
          .then(() => this.$Progress.finish())
          .catch(() => this.$Progress.fail());
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
