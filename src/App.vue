<template>
  <div id="app">
    <jch-navbar></jch-navbar>

    <main>
      <router-view></router-view>
      <vue-progress-bar></vue-progress-bar>
    </main>

    <jch-footer></jch-footer>
  </div>
</template>

<script>
  import JchNavbar from '@/components/layout/Navbar';
  import JchFooter from '@/components/layout/Footer';

  export default {
    name: 'app',

    components: {
      JchNavbar,
      JchFooter,
    },

    created() {
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start();

        next();
      });

      this.$router.afterEach(() => {
        this.$Progress.finish();
      });
    },

    mounted() {
      this.$Progress.finish();
    },
  };
</script>
