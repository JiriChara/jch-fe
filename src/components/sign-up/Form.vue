<template>
  <form @submit="onSubmit">
    <b-field label="Name"
      :type="$v.name.$error ? 'is-danger': null"
      :message="nameErrorMessages">
      <b-input
        ref="name"
        v-model="name"
        @input="$v.name.$touch()"
        placeholder="Your name"
        autofocus />
    </b-field>

    <b-field label="Email"
      :type="$v.email.$error ? 'is-danger': null"
      :message="emailErrorMessages">
      <b-input
        ref="email"
        v-model="email"
        @input="$v.email.$touch()"
        placeholder="Your email"
        type="email" />
    </b-field>

    <b-field label="Password"
      :type="$v.password.$error ? 'is-danger': null"
      :message="passwordErrorMessages">
      <b-input
        v-model="password"
        @input="$v.password.$touch()"
        placeholder="Your password"
        type="password" />
    </b-field>

    <b-field label="Password Confirmation"
      :type="$v.passwordConfirmation.$error ? 'is-danger': null"
      :message="passwordConfirmationErrorMessages">
      <b-input
        v-model="passwordConfirmation"
        @input="$v.passwordConfirmation.$touch()"
        placeholder="Retype your password"
        type="password" />
    </b-field>

    <b-field grouped>
      <p class="control">
        <button
          class="button is-primary"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
          Sign Up
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';

  export default {
    name: 'jch-sign-up-form',

    data() {
      return {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      };
    },

    computed: {
      nameErrorMessages() {
        const messages = [];

        if (this.$v.name.$error) {
          if (!this.$v.name.required) {
            messages.push('Name is required');
          }
        }

        return messages;
      },

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

          if (!this.$v.password.minLength) {
            messages.push('Password is too short');
          }
        }

        return messages;
      },

      passwordConfirmationErrorMessages() {
        const messages = [];

        if (this.$v.passwordConfirmation.$error) {
          if (!this.$v.passwordConfirmation.required) {
            messages.push('Password Confirmation is required');
          }

          if (!this.$v.passwordConfirmation.sameAsPassword) {
            messages.push('Password Confirmation must be same as password');
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
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        };
      },
    },

    validations: {
      name: {
        required,
      },

      email: {
        required,
        email,
      },

      password: {
        required,
        minLength: minLength(6),
      },

      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },

    mounted() {
      this.$refs.name.focus();
    },
  };
</script>
