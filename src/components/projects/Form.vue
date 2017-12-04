<template>
  <form @submit="onSubmit">
    <b-field label="Name"
      :type="$v.name.$error ? 'is-danger': null"
      :message="nameErrorMessages">

      <b-input
        ref="name"
        v-model="name"
        @input="$v.name.$touch()"
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
          placeholder="Choose a URL for your project" />
    </b-field>

    <b-field label="Slug">
        <b-input
          v-model="slug"
          @input="$v.slug.$touch()"
          placeholder="Choose a slug for your project" />
    </b-field>

    <b-field label="Description"
      :type="$v.description.$error ? 'is-danger': null"
      :message="descriptionErrorMessages">
        <b-input
          type="textarea"
          v-model="description"
          @input="$v.description.$touch()" />
    </b-field>

    <b-field label="Publish?">
      <b-switch v-model="isPublished"></b-switch>
    </b-field>

    <b-field label="Published At Date">
      <b-datepicker
        inline
        :disabled="!isPublished"
        v-model="publishedAtDate"
        placeholder="Click to select...">

        <button class="button is-primary"
          @click.prevent="publishedAtDate = new Date()">
          <b-icon icon="calendar"></b-icon>
          <span>Today</span>
        </button>
      </b-datepicker>
    </b-field>

    <b-field label="Published At Time">
      <b-timepicker
        inline
        :disabled="!isPublished"
        v-model="publishedAtTime"
        placeholder="Click to select..."
        hour-format="24">

        <button class="button is-primary"
          @click.prevent="publishedAtTime = new Date()">
          <b-icon icon="clock-o"></b-icon>
          <span>Now</span>
        </button>
      </b-timepicker>
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
  import moment from 'moment';
  import { required } from 'vuelidate/lib/validators';

  import ImageUpload from '@/components/utils/ImageUpload';

  export default {
    name: 'jch-project-form',

    components: {
      'jch-image-upload': ImageUpload,
    },

    props: {
      project: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      return {
        name: this.project.name || '',
        slug: this.project.slug || '',
        url: this.project.url || '',
        description: this.project.description || '',
        image: this.project.image || '',
        publishedAtDate: moment(this.project.publishedAt).toDate(),
        publishedAtTime: moment(this.project.publishedAt).toDate(),
        isPublished: !!this.project.publishedAt || false,
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
          publishedAt: this.isPublished ? moment(this.publishedAtDate).set({
            hour: moment(this.publishedAtTime).get('hour'),
            minute: moment(this.publishedAtTime).get('minute'),
            second: 0,
            millisecond: 0,
          }).toISOString() : null,
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
