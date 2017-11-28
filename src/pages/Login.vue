<template>
  <div>
    <jch-hero :title="title"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-login-form @submit="onSubmit" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchLoginForm from '@/components/login/Form';

  export default {
    name: 'login',

    metaInfo: {
      title: 'Login',
    },

    components: {
      JchHero,
      JchLoginForm,
    },

    data() {
      return {
        title: 'Login',
      };
    },

    methods: {
      ...mapActions('tokens', {
        createToken: 'create',
      }),

      onSubmit(auth) {
        this.$Progress.start();

        return this.createToken({ data: { auth } })
          .then(() => {
            router.push({ name: 'articles' });

            this.$snackbar.open({
              message: 'Successfully logged in',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Can\'t login',
              type: 'is-danger',
            });

            this.$Progress.fail();
          });
      },
    },
  };
</script>
