<template>
  <form @submit="onSubmit">
    <b-field label="Name"
      :type="$v.name.$error ? 'is-danger': null"
      :message="nameErrorMessages">
      <b-input
        ref="name"
        v-model="name"
        @input="$v.name.$touch()"
        placeholder="Choose a name for your tag"
        autofocus />
    </b-field>

    <b-field label="Slug">
      <b-input
        v-model="slug"
        @input="$v.slug.$touch()"
        placeholder="Choose a slug for your tag" />
    </b-field>

    <b-field grouped>
      <p class="control">
        <button
          class="button is-primary"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
          Submit
        </button>
      </p>

      <p class="control">
        <button @click.prevent="onReset" class="button is-link">Cancel</button>
      </p>
    </b-field>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';

  export default {
    name: 'jch-tag-form',

    props: {
      tag: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      return {
        name: this.tag.name || '',
        slug: this.tag.slug || '',
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
    },

    methods: {
      onSubmit() {
        this.$emit('submit', this.serialize());
      },

      onReset() {
        this.$emit('reset');
      },

      serialize() {
        return {
          name: this.name,
          slug: this.slug,
        };
      },
    },

    validations: {
      name: {
        required,
      },

      slug: {},
    },

    mounted() {
      this.$refs.name.focus();
    },
  };
</script>
