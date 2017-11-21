<template>
  <form @submit="onSubmit">
    <b-field label="Email"
      :type="$v.email.$error ? 'is-danger': null"
      :message="emailErrorMessages">
      <b-input
        ref="email"
        v-model="email"
        @input="$v.email.$touch()"
        placeholder="Your Email"
        type="email"
        autofocus />
    </b-field>

    <b-field label="Password"
      :type="$v.password.$error ? 'is-danger': null"
      :message="passwordErrorMessages">
      <b-input
        v-model="password"
        @input="$v.password.$touch()"
        placeholder="Your Password"
        type="password" />
    </b-field>

    <b-field grouped>
      <p class="control">
        <button
          class="button is-primary"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
          Login
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators';

  export default {
    name: 'jch-login-form',

    data() {
      return {
        email: '',
        password: '',
      };
    },

    computed: {
      emailErrorMessages() {
        const messages = [];

        if (this.$v.email.$error) {
          if (!this.$v.email.required) {
            messages.push('Email is required');
          }

          if (!this.$v.email.email) {
            messages.push('Email is not a valid');
          }
        }

        return messages;
      },

      passwordErrorMessages() {
        const messages = [];

        if (this.$v.password.$error) {
          if (!this.$v.password.required) {
            messages.push('Password is required');
          }
        }

        return messages;
      },
    },

    methods: {
      onSubmit() {
        this.$emit('submit', this.serialize());
      },

      serialize() {
        return {
          email: this.email,
          password: this.password,
        };
      },
    },

    validations: {
      email: {
        required,
        email,
      },

      password: {
        required,
      },
    },

    mounted() {
      this.$refs.email.focus();
    },
  };
</script>
