<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="menu">
              <template v-for="group in sidebar">
                <p class="menu-label">
                  {{ group.title }}
                </p>

                <ul class="menu-list">
                  <li v-for="item in group.items">
                    <router-link :to="item.path" :class="{ 'is-active': item.isSelected }">
                      <b-icon :icon="item.icon" size="is-small"></b-icon>
                      <span>{{ item.title }}</span>
                    </router-link>
                  </li>
                </ul>
              </template>
            </aside>
          </div>

          <div class="column">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import JchContent from '@/components/layout/Content';
  import JchHero from '@/components/layout/Hero';

  export default {
    name: 'admin',

    metaInfo: {
      title: 'Admin',
    },

    components: {
      JchContent,
      JchHero,
    },

    data() {
      return {
        title: 'Admin',
        subtitle: '..manage stuff',
      };
    },

    computed: {
      ...mapState([
        'route',
      ]),

      sidebar() {
        return [
          {
            title: 'Articles',
            items: [
              {
                title: 'Add',
                icon: 'plus',
                path: { name: 'admin-new-article' },
                isSelected: this.route.name === 'admin-new-article',
              },

              {
                title: 'List',
                icon: 'table',
                path: { name: 'admin-article-table' },
                isSelected: this.route.name === 'admin-article-table',
              },
            ],
          },

          {
            title: 'Projects',
            items: [
              {
                title: 'Add',
                icon: 'plus',
                path: { name: 'admin-new-project' },
                isSelected: this.route.name === 'admin-new-project',
              },

              {
                title: 'List',
                icon: 'table',
                path: { name: 'admin-project-table' },
                isSelected: this.route.name === 'admin-project-table',
              },
            ],
          },
        ];
      },
    },
  };
</script>
