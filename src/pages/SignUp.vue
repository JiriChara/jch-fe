<template>
  <div>
    <jch-hero :title="title"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-sign-up-form @submit="onSubmit" @reset="onReset" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import router from '@/router';
  import JchHero from '@/components/layout/Hero';
  import JchSignUpForm from '@/components/sign-up/Form';

  export default {
    name: 'sign-up',

    components: {
      JchHero,
      JchSignUpForm,
    },

    data() {
      return {
        title: 'Sign Up',
      };
    },

    methods: {
      ...mapActions('users', {
        createUser: 'create',
      }),

      onSubmit(user) {
        this.$Progress.start();

        return this.createUser({ data: { user } })
          .then(() => {
            router.push({ name: 'articles' });

            this.$snackbar.open({
              message: 'Successfully signed up',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Can\'t sign up',
              type: 'is-danger',
            });

            this.$Progress.fail();
          });
      },

      onReset() {
        router.push({
          name: 'articles',
        });
      },
    },
  };
</script>
