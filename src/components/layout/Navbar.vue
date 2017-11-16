<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item logo" to="/">
          <h1 class="title is-3"><span>J</span>iří <span>Ch</span>ára</h1>
        </router-link>

        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link
            v-for="item in menuItems"
            :to="item.to"
            :key="item.title"
            class="navbar-item"
            :class="{ 'is-active': item.isSelected }">
            <span>{{ item.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'jch-navbar',

    computed: {
      ...mapState([
        'route',
      ]),

      menuItems() {
        return [
          {
            title: 'Blog',
            to: { name: 'articles' },
            isSelected: this.route.name === 'articles',
          },

          {
            title: 'Projects',
            to: { name: 'projects' },
            isSelected: this.route.name === 'projects',
          },

          {
            title: 'About Me',
            to: { name: 'about' },
            isSelected: this.route.name === 'about',
          },

          {
            title: 'Curriculum Vitae',
            to: { name: 'cv' },
            isSelected: this.route.name === 'cv',
          },
        ];
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';

  .logo {
    &:hover {
      color: $theme-color-2;
      background-color: transparent;
    }

    h1 {
      font-family: 'Barrio', cursive;
      color: $theme-color-2;
      font-weight: normal;

      span {
        color: $theme-color-3;
      }
    }
  }

  a {
    outline: 0;

    &.is-active {
      span::first-letter {
        color: $theme-color-3;
      }
    }
  }
</style>
