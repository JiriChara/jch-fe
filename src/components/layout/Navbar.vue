<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item logo" to="/">
          <h1 class="title is-3"><span>J</span>iří <span>Ch</span>ára</h1>
        </router-link>

        <button class="button navbar-burger"
          :class="{ 'is-active': isMobileMenuActive }"
          @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="navbar-menu"
        :class="{ 'is-active': isMobileMenuActive }">
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

        <div class="navbar-end">
          <a href="https://github.com/JiriChara" class="navbar-item">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
          </a>

          <a href="https://twitter.com/JiriChara" class="navbar-item">
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
          </a>

          <a href="https://www.linkedin.com/in/jirichara" class="navbar-item">
            <span class="icon">
              <i class="fa fa-linkedin"></i>
            </span>
          </a>

          <a href="http://www.last.fm/user/Ch4rAss" class="navbar-item">
            <span class="icon">
              <i class="fa fa-lastfm"></i>
            </span>
          </a>

          <a v-if="$logout.isAllowed('route')" href="javascript:void(0);" class="navbar-item logout" @click="onLogout">
            <b-icon icon="sign-out"></b-icon>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

  import router from '@/router';
  import logoutPerimeter from '@/perimeters/logout';

  export default {
    name: 'jch-navbar',

    perimeters: [
      logoutPerimeter,
    ],

    computed: {
      ...mapState([
        'route',
      ]),

      ...mapState('navbar', [
        'isMobileMenuActive',
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

    methods: {
      ...mapMutations('navbar', [
        'toggleMobileMenu',
      ]),

      ...mapActions('me', [
        'logout',
      ]),

      onLogout() {
        this.logout().then(() => {
          this.toggleMobileMenu();

          router.push({ name: 'articles' });

          this.$snackbar.open({
            message: 'Successfully logged out',
            type: 'is-success',
          });
        });
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

  .icon {
    .fa-lastfm {
      color: #b90000;
    }

    .fa-twitter {
      color: #1da1f2;
    }

    .fa-linkedin {
      color: #0084bf;
    }

    .fa-github {
      color: #6a737d;
    }
  }
</style>
