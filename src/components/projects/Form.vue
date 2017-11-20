<template>
  <form @submit="onSubmit">
    <b-field label="Name"
      :type="$v.name.$error ? 'is-danger': null"
      :message="nameErrorMessages">

      <b-input
        ref="name"
        v-model="name"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
        placeholder="Choose a name for your project"
        autofocus />
    </b-field>

    <b-field label="Image">
      <jch-image-upload @load="onLoad" />
    </b-field>

    <b-field label="Url"
      :type="$v.url.$error ? 'is-danger': null"
      :message="urlErrorMessages">
        <b-input
          v-model="url"
          @input="$v.url.$touch()"
          @blur="$v.url.$touch()"
          placeholder="Choose a URL for your project" />
    </b-field>

    <b-field label="Slug">
        <b-input
          v-model="slug"
          @input="$v.slug.$touch()"
          @blur="$v.slug.$touch()"
          placeholder="Choose a slug for your project" />
    </b-field>

    <b-field label="Description"
      :type="$v.description.$error ? 'is-danger': null"
      :message="descriptionErrorMessages">
        <b-input
          type="textarea"
          v-model="description"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()" />
    </b-field>

    <div class="field is-grouped">
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
    </div>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';

  import ImageUpload from '@/components/utils/ImageUpload';

  export default {
    components: {
      'jch-image-upload': ImageUpload,
    },

    props: {
      project: {
        type: Object,
        default: () => ({}),
      },
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

      urlErrorMessages() {
        const messages = [];

        if (this.$v.url.$error) {
          if (!this.$v.url.required) {
            messages.push('URL is required');
          }
        }

        return messages;
      },

      descriptionErrorMessages() {
        const messages = [];

        if (this.$v.description.$error) {
          if (!this.$v.description.required) {
            messages.push('Description is required');
          }
        }

        return messages;
      },
    },

    data() {
      return {
        name: this.project.name || '',
        slug: this.project.slug || '',
        url: this.project.url || '',
        description: this.project.description || '',
        image: this.project.image || '',
      };
    },

    methods: {
      onLoad(file) {
        this.image = file;
      },

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
          url: this.url,
          description: this.description,
          image: this.image,
        };
      },
    },

    validations: {
      name: {
        required,
      },

      description: {
        required,
      },

      url: {
        required,
      },

      slug: {},
    },

    mounted() {
      this.$refs.name.focus();
    },
  };
</script>
