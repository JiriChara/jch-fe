<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-content>
          <b-notification v-if="!isLoadingProjects && !projectGroups.length" type="is-info" has-icon :closable="false">
            Ooops, no projects found..
          </b-notification>

          <nav class="level" v-if="isLoadingProjects">
            <p class="level-item has-text-centered">
              <jch-loader></jch-loader>
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
            <jch-sidebar-about-me-small></jch-sidebar-about-me-small>
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
  import JchSidebarAboutMeSmall from '@/components/sidebar/AboutMeSmall';

  export default {
    name: 'projects',

    metaInfo: {
      title: 'Projects',
    },

    components: {
      JchContent,
      JchHero,
      JchProjectCard,
      JchSidebarAboutMeSmall,
    },

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
              column: 'published_at',
              direction: 'desc',
            },
            page: {
              size: 999,
            },
            published: true,
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
