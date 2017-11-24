<template>
  <div>
    <jch-hero :title="title"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-sign-up-form @submit="onSubmit" />
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

      ...mapActions('tokens', {
        createToken: 'create',
      }),

      async onSubmit(user) {
        this.$Progress.start();

        try {
          await this.createUser({ data: { user } });

          const auth = {
            email: user.email,
            password: user.password,
          };

          await this.createToken({ data: { auth } });

          router.push({ name: 'articles' });

          this.$snackbar.open({
            message: 'Successfully signed up',
            type: 'is-success',
          });

          this.$Progress.finish();
        } catch (e) {
          this.$snackbar.open({
            message: 'Can\'t sign up',
            type: 'is-danger',
          });

          this.$Progress.fail();
        }
      },
    },
  };
</script>
